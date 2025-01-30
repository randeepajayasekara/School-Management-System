"use client";

import dynamic from "next/dynamic";
import { JSX } from "react";
import {
  TrashIcon,
  XMarkIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { getDatabase, ref, remove, get, Database } from "firebase/database";
import { toast } from "react-hot-toast";

// USE LAZY LOADING

const TeacherForm = dynamic(() => import("@/components/forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("@/components/forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("@/components/forms/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-gray-600"
      : type === "update"
      ? "bg-zinc-400 p-1 dark:bg-zinc-800 dark:border-none"
      : "bg-red-400 p-1 dark:border-none";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) return;

    const db: Database = getDatabase();
    const itemRef = ref(db, `${table}/${id}`);
    setLoading(true);

    const snapshot = await get(itemRef);
    if (!snapshot.exists()) {
      toast.error(`${table.charAt(0).toUpperCase() + table.slice(1)} not found`);
      setLoading(false);
      return;
    }

    try {
      await remove(itemRef);
      toast.success(`${table.charAt(0).toUpperCase() + table.slice(1)} deleted successfully`);
      setOpen(false);
    } catch (error) {
      toast.error(`Error deleting ${table}: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
        className="p-4 flex flex-col gap-4"
      >
        <span className="text-center font-medium dark:text-black">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button
          type="submit"
          className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center hover:bg-red-800 duration-150"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full border ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {type === "create" && <PlusIcon className="w-5 h-5 text-white" />}
        {type === "update" && <PencilIcon className="w-5 h-5 text-white" />}
        {type === "delete" && <TrashIcon className="w-5 h-5 text-white" />}
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 hover:bg-gray-100 dark:text-black rounded-full hover:p-1 duration-300" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
