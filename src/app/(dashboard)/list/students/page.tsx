"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  ArrowsUpDownIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Student = {
  id: string;
  studentUid: string;
  username: string;
  email?: string;
  imageUrl: string;
  phone: string;
  birthday: string;
  bloodType: string;
  address: string;
  class: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentUid",
    className: "hidden md:table-cell",
  },
  {
    header: "Birthdate",
    accessor: "birthday",
    className: "hidden md:table-cell",
  },
  {
    header: "Blood Type",
    accessor: "bloodType",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentListPage = () => {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [filters, setFilters] = useState<{
    subject: string;
    className: string;
  }>({ subject: "", className: "" });

  useEffect(() => {
    const fetchStudents = async () => {
      const q = query(collection(db, "users"), where("role", "==", "student"));
      const querySnapshot = await getDocs(q);
      const studentsList: Student[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        studentsList.push({
          id: doc.id,
          studentUid: data.id,
          username: data.username,
          email: data.email,
          imageUrl: data.profilePicture,
          phone: data.phone,
          birthday: data.birthday,
          bloodType: data.bloodType,
          address: data.address,
          class: data.class,
        });
      });
      setStudentsData(studentsList);
    };

    fetchStudents();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleApplyFilters = (newFilters: {
    subject: string;
    className: string;
  }) => {
    setFilters({
      subject: newFilters.subject.toLowerCase(),
      className: newFilters.className.toLowerCase(),
    });
    setCurrentPage(1); // Reset to first page on filter
  };

  const sortedData = [...studentsData].sort((a: Student, b: Student) => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      if (
        String(a[key as keyof Student] ?? "").toLowerCase() <
        String(b[key as keyof Student] ?? "").toLowerCase()
      ) {
        return direction === "ascending" ? -1 : 1;
      }
      if (
        String(a[key as keyof Student] ?? "").toLowerCase() >
        String(b[key as keyof Student] ?? "").toLowerCase()
      ) {
        return direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter(
    (student) =>
      (student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentUid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.birthday.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.class.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const itemsPerPage = 9;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-gray-800 even:bg-slate-50 dark:even:bg-slate-900 text-sm hover:bg-CustomPurpleLight dark:hover:bg-slate-800 duration-300"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.imageUrl}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.username}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentUid}</td>
      <td className="hidden md:table-cell">{item.birthday}</td>
      <td className="hidden md:table-cell">{item.bloodType}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-400 p-1">
              <EyeIcon className="w-5 h-5 text-white" />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-md flex-1 m-4 mt-0 border-2 border-gray-200 dark:border-gray-700">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
          <div className="flex items-center gap-4 self-end">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border dark:border-gray-700"
              onClick={() => handleSort("username")}
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-400 dark:text-white" />
            </button>
            {typeof window !== "undefined" && localStorage.getItem("userRole") === "admin" && (
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {paginatedData.length > 0 ? (
        <Table columns={columns} renderRow={renderRow} data={paginatedData} />
      ) : (
        <p className="text-center text-gray-500">No results found</p>
      )}
      {/* PAGINATION */}
      <Pagination
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentListPage;
