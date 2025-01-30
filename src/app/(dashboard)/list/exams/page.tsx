"use client";

import { useState, useEffect } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData } from "@/lib/data";

type Exam = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "subject",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
];

const ExamListPage = () => {
  const [filteredData, setFilteredData] = useState<Exam[]>(examsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Exam;
    direction: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(11);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    let filtered = examsData.filter(
      (exam) =>
        exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedSubject) {
      filtered = filtered.filter((exam) => exam.subject === selectedSubject);
    }

    if (selectedClass) {
      filtered = filtered.filter((exam) => exam.class === selectedClass);
    }

    if (sortConfig) {
      filtered = filtered.sort((a, b) => {
        if (sortConfig.key === "date") {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA < dateB) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (dateA > dateB) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
      });
    }

    setFilteredData(filtered);
  }, [searchQuery, sortConfig, selectedSubject, selectedClass]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (key: keyof Exam) => {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const renderRow = (item: Exam) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-gray-800 even:bg-slate-50 dark:even:bg-slate-900 text-sm hover:bg-CustomPurpleLight dark:hover:bg-slate-800 duration-300"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.date}</td>
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
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
          <div className="flex items-center gap-2 md:flex-row sm:flex-col">
            <div>
              <select
                onChange={handleSubjectChange}
                value={selectedSubject}
                className="border p-2 rounded text-sm mr-2 mb-2 md:mb-0 dark:bg-slate-800"
              >
                <option value="">All Subjects</option>
                {/* Add options dynamically based on available subjects */}
                {[...new Set(examsData.map((exam) => exam.subject))].map(
                  (subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  )
                )}
              </select>
              <select
                onChange={handleClassChange}
                value={selectedClass}
                className="border p-2 rounded text-sm dark:bg-slate-800"
              >
                <option value="">All Classes</option>
                {/* Add options dynamically based on available classes */}
                {[...new Set(examsData.map((exam) => exam.class))].map(
                  (cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  )
                )}
              </select>
            </div>
            <button
              className="flex w-10 h-10 items-center justify-center rounded-full border dark:border-gray-700"
              onClick={() => handleSort("date")}
              title="Sort by Date"
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      {filteredData.length > 0 ? (
        <Table columns={columns} renderRow={renderRow} data={paginatedData} />
      ) : (
        <div className="text-center py-4">No results</div>
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

export default ExamListPage;
