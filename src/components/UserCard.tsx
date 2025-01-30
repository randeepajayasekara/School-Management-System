"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const UserCard = ({ type }: { type: string }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("role", "==", type));
      const querySnapshot = await getDocs(q);
      setCount(querySnapshot.size);
    };

    fetchUserCount();
  }, [type]);

  return (
    <div className="rounded-2xl odd:bg-sky-200 dark:odd:bg-sky-900 even:bg-sky-100 dark:even:bg-sky-700 p-4 flex-1 min-w-[130px] border-2 border-sky-500 dark:border-sky-500 z-10 md:z-0">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
         {new Date().getFullYear() - 1}/{new Date().getFullYear()}
        </span>
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500 dark:text-gray-100">
        {type}s
      </h2>
    </div>
  );
};

export default UserCard;