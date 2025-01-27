"use client";

import { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell cursor-pointer",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const EventListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedClass, setSelectedClass] = useState("");
  const pageSize = 10;

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleClassFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedClass(event.target.value);
  };

  const filteredData = eventsData
    .filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((event) => selectedClass === "" || event.class === selectedClass)
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-gray-800 even:bg-slate-50 dark:even:bg-slate-900 text-sm hover:bg-CustomPurpleLight dark:hover:bg-slate-800 duration-300"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bbg-white dark:bg-slate-900 p-4 rounded-md flex-1 m-4 mt-0 border-2 border-gray-200 dark:border-gray-700">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={setSearchQuery} />
          <select
            value={selectedClass}
            onChange={handleClassFilterChange}
            className="border rounded p-2 text-sm dark:bg-slate-800 dark:border-gray-600"
          >
            <option value="">All Classes</option>
            {[...new Set(eventsData.map((event) => event.class))].map(
              (className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              )
            )}
          </select>
          <div className="flex items-center gap-4 self-end">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border dark:border-gray-700"
              onClick={handleSort}
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
            </button>
            {role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      {filteredData.length > 0 ? (
        <Table
          columns={columns}
          renderRow={renderRow}
          data={paginatedData}
          onHeaderClick={(accessor) => {
            if (accessor === "date") handleSort();
          }}
        />
      ) : (
        <div className="text-center text-gray-500">No results found</div>
      )}
      {/* PAGINATION */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / pageSize)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default EventListPage;
