import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import React from "react";

type FilteringCriteriasProps = {
  onApplyFilters: (filters: { subject: string; className: string }) => void;
};

const FilteringCriterias = ({ onApplyFilters }: FilteringCriteriasProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    subject: "",
    className: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    closeModal();
  };

  const handleClearFilters = () => {
    const clearedFilters = { subject: "", className: "" };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  return (
    <>
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full border dark:border-zinc-700"
        onClick={openModal}
      >
        <FunnelIcon className="w-5 h-5 text-gray-400 dark:text-white" />
      </button>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-lg p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Select Filtering Criterias
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-white">
                      Choose the criteria you want to filter by:
                    </p>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={filters.subject}
                        onChange={handleChange}
                        className="bg-white dark:bg-slate-900/60 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Class
                      </label>
                      <input
                        type="text"
                        name="className"
                        value={filters.className}
                        onChange={handleChange}
                        className="bg-white dark:bg-slate-900/60 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleApplyFilters}
                    >
                      Apply Filters
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FilteringCriterias;
