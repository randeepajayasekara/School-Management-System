"use client";

import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { subjectsData } from "@/lib/data";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
];

const SubjectListPage = () => {
  const [filteredData, setFilteredData] = useState<Subject[]>(subjectsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [error] = useState<string | null>(null);

  useEffect(() => {
    let filtered = subjectsData.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.teachers.some((teacher) =>
          teacher.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    if (sortConfig !== null) {
      filtered = filtered.sort((a, b) => {
        const key = sortConfig.key as keyof Subject;
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(filtered);
  }, [searchQuery, sortConfig]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-gray-800 even:bg-slate-50 dark:even:bg-slate-900 text-sm hover:bg-CustomPurpleLight dark:hover:bg-slate-800 duration-300"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(", ")}</td>
    </tr>
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-md flex-1 m-4 mt-0 border-2 border-gray-200 dark:border-gray-700">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />

        </div>
      </div>
      {/* LIST */}
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredData.length > 0 ? (
        <Table columns={columns} renderRow={renderRow} data={paginatedData} />
      ) : (
        <div className="text-center text-gray-500">No results found</div>
      )}
      {/* PAGINATION */}
      <Pagination
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SubjectListPage;
