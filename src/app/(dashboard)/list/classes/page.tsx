"use client";

import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData } from "@/lib/data";

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
];

const ClassListPage = () => {
  const [filteredData, setFilteredData] = useState<Class[]>(classesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(11);
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState<number | null>(null);
  const [supervisorFilter, setSupervisorFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let filtered = classesData.filter(
      (cls) =>
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.capacity.toString().includes(searchQuery) ||
        cls.grade.toString().includes(searchQuery) ||
        cls.supervisor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (gradeFilter !== null) {
      filtered = filtered.filter((cls) => cls.grade === gradeFilter);
    }

    if (supervisorFilter) {
      filtered = filtered.filter((cls) =>
        cls.supervisor.toLowerCase().includes(supervisorFilter.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchQuery, gradeFilter, supervisorFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGradeFilterChange = (grade: number | null) => {
    setGradeFilter(grade);
  };

  const handleSupervisorFilterChange = (supervisor: string) => {
    setSupervisorFilter(supervisor);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-gray-800 even:bg-slate-50 dark:even:bg-slate-900 text-sm hover:bg-CustomPurpleLight dark:hover:bg-slate-800 duration-300"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>
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
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
        </div>
      </div>
      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <input
          type="number"
          placeholder="Filter by Grade"
          value={gradeFilter ?? ""}
          onChange={(e) =>
            handleGradeFilterChange(
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          className="border p-2 rounded text-sm md:w-48 sm:w-[70px] dark:bg-transparent"
          min="1"
          max="13"
        />
        <input
          type="text"
          placeholder="Filter by Supervisor"
          value={supervisorFilter}
          onChange={(e) => handleSupervisorFilterChange(e.target.value)}
          className="border p-2 rounded text-sm md:w-48 sm:w-[70px] dark:bg-transparent"
        />
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

export default ClassListPage;
