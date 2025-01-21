import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const Announcements = () => {
    return (
      <div className="bg-white dark:bg-slate-900 p-4 rounded-md border-2 border-gray-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Announcements</h1>
          <EllipsisHorizontalIcon className="h-5 w-5"/>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-lamaSkyLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Lorem ipsum dolor sit</h2>
              <span className="text-xs text-gray-400 bg-white dark:bg-gray-800 rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
              expedita. Rerum, quidem facilis?
            </p>
          </div>
          <div className="bg-lamaPurpleLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Lorem ipsum dolor sit</h2>
              <span className="text-xs text-gray-400 bg-white dark:bg-gray-800 rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
              expedita. Rerum, quidem facilis?
            </p>
          </div>
          <div className="bg-lamaYellowLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Lorem ipsum dolor sit</h2>
              <span className="text-xs text-gray-400 bg-white dark:bg-gray-800 rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
              expedita. Rerum, quidem facilis?
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Announcements;