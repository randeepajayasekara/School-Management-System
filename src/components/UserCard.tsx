import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-sky-200 dark:odd:bg-sky-900 even:bg-sky-100 dark:even:bg-sky-700 p-4 flex-1 min-w-[130px] border-2 border-sky-500 dark:border-sky-500">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <EllipsisHorizontalIcon className="h-5 w-5"/>
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500 dark:text-gray-100">{type}s</h2>
    </div>
  );
};

export default UserCard;