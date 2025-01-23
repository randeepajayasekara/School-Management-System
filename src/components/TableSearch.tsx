"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface TableSearchProps {
  onSearch: (query: string) => void;
}

const TableSearch: React.FC<TableSearchProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <MagnifyingGlassIcon className="h-4 w-4" />
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
