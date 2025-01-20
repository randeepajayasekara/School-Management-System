"use client";

import { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FilteringCriterias from "@/components/ui/filteringCriterias";
import { role, teachersData } from "@/lib/data";
import {
  FunnelIcon,
  ArrowsUpDownIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
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
      (teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects
          .join(",")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        teacher.classes
          .join(",")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        teacher.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.address.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.subject === "" ||
        teacher.subjects
          .map((subject) => subject.toLowerCase())
          .includes(filters.subject)) &&
      (filters.className === "" ||
        teacher.classes
          .map((className) => className.toLowerCase())
          .includes(filters.className))
  );

  const itemsPerPage = 9;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-CustomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(", ")}</td>
      <td className="hidden md:table-cell">{item.classes.join(", ")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-400 p-1">
              <EyeIcon className="w-5 h-5 text-white" />
            </button>
          </Link>
          {role === "admin" && (
            <div className="flex items-center gap-2">
              <FormModal table="teacher" type="delete" id={item.id} />
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 border-2 border-gray-200">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
          <div className="flex items-center gap-4 self-end">
            <FilteringCriterias onApplyFilters={handleApplyFilters} />
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border"
              onClick={() => handleSort("name")}
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
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
