"use client";

import { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role } from "@/lib/data";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  date: string;
  score: number;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ResultListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const pageSize = 15;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSubjectFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubjectFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleTeacherFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleClassFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = resultsData.filter((item) =>
    (subjectFilter === "" || item.subject === subjectFilter) &&
    (teacherFilter === "" || item.teacher === teacherFilter) &&
    (classFilter === "" || item.class === classFilter) &&
    (item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.class.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-CustomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 border-2 border-gray-200">
      {/* TOP */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-lg font-semibold mb-4 md:mb-0">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
          <div className="flex flex-col md:flex-row items-center gap-4 self-end text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-flow-row gap-4 w-full">
              <select value={subjectFilter} onChange={handleSubjectFilterChange} className="border rounded-full p-1 w-full">
              <option value="">All Subjects</option>
              {/* Add options dynamically based on available subjects */}
              {Array.from(new Set(resultsData.map((item) => item.subject))).map((subject) => (
                <option key={subject} value={subject}>
                {subject}
                </option>
              ))}
              </select>
              <select value={teacherFilter} onChange={handleTeacherFilterChange} className="border rounded-full p-1 w-full">
              <option value="">All Teachers</option>
              {/* Add options dynamically based on available teachers */}
              {Array.from(new Set(resultsData.map((item) => item.teacher))).map((teacher) => (
                <option key={teacher} value={teacher}>
                {teacher}
                </option>
              ))}
              </select>
              <select value={classFilter} onChange={handleClassFilterChange} className="border rounded-full p-1 w-full">
              <option value="">All Classes</option>
              {/* Add options dynamically based on available classes */}
              {Array.from(new Set(resultsData.map((item) => item.class))).map((className) => (
                <option key={className} value={className}>
                {className}
                </option>
              ))}
              </select>
            </div>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border"
              onClick={handleSort}
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModal table="result" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {paginatedData.length > 0 ? (
        <Table columns={columns} renderRow={renderRow} data={paginatedData} />
      ) : (
        <div className="text-center text-gray-500 mt-4">No results found</div>
      )}
      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / pageSize)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ResultListPage;