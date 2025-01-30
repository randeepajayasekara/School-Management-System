"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilteringCriterias from "@/components/ui/filteringCriterias";
import {
  ArrowsUpDownIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Teacher = {
  id: string;
  teacherUid: string;
  username: string;
  email?: string;
  imageUrl: string;
  phone: string;
  birthday: string;
  bloodtype: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherUid",
    className: "hidden md:table-cell",
  },
  {
    header: "Birthdate",
    accessor: "birthdate",
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
    header: "Actions",
    accessor: "action",
  },
];

const TeacherListPage = () => {
  const [teachersData, setTeachersData] = useState<Teacher[]>([]);
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
    const fetchTeachers = async () => {
      const q = query(collection(db, "users"), where("role", "==", "teacher"));
      const querySnapshot = await getDocs(q);
      const teachersList: Teacher[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        teachersList.push({
          id: doc.id,
          teacherUid: data.id, 
          username: data.username,
          email: data.email,
          imageUrl: data.profilePicture,
          phone: data.phone,
          birthday: data.birthday,
          bloodtype: data.bloodType,
          address: data.address,
        });
      });
      setTeachersData(teachersList);
    };

    fetchTeachers();
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

  const sortedData = [...teachersData].sort((a: Teacher, b: Teacher) => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      if (
        String(a[key as keyof Teacher] ?? "").toLowerCase() <
        String(b[key as keyof Teacher] ?? "").toLowerCase()
      ) {
        return direction === "ascending" ? -1 : 1;
      }
      if (
        String(a[key as keyof Teacher] ?? "").toLowerCase() >
        String(b[key as keyof Teacher] ?? "").toLowerCase()
      ) {
        return direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter(
    (teacher) =>
      (teacher.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.teacherUid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.birthday
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        teacher.bloodtype
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        teacher.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const itemsPerPage = 9;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Teacher) => (
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
      <td className="hidden md:table-cell">{item.teacherUid}</td>
      <td className="hidden md:table-cell">{item.birthday}</td>
      <td className="hidden md:table-cell">{item.bloodtype}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
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
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
          <div className="flex items-center gap-4 self-end">
            <FilteringCriterias onApplyFilters={handleApplyFilters} />
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border dark:border-gray-700"
              onClick={() => handleSort("username")}
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-400 dark:text-white" />
            </button>
            {typeof window !== "undefined" && localStorage.getItem("userRole") === "admin" && (
              <FormModal table="teacher" type="create" />
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

export default TeacherListPage;