"use client";

import { useState } from "react";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-2 rounded-sm ${currentPage === i ? "bg-lamaSky" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="py-2 px-4 rounded-md bg-slate-200 dark:text-zinc-800 text-xs font-normal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {renderPageNumbers()}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="py-2 px-4 rounded-md bg-slate-200 dark:text-zinc-800 text-xs font-normal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
