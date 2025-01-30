"use client";

import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

interface PerformanceStrings {
  title: string;
  subtitle: string;
  brakedsubtitle: string;
  centerText: string;
  centerSubText: string;
}

const strings: PerformanceStrings = {
  title: "Performance",
  subtitle: "1st Term - 2nd Term",
  brakedsubtitle: "(Not held)",
  centerText: "N/A",
  centerSubText: "of 10 max ⭐",
};

const Performance = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-md h-80 relative border-2 border-gray-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">{strings.title}</h1>
      <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>
      <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        fill="#2563EB"
        />
      </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className="text-3xl font-bold">{strings.centerText}</h1>
      <p className="text-xs text-gray-300">{strings.centerSubText}</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">
      {strings.subtitle} <br/> {strings.brakedsubtitle}
      </h2>
    </div>
  );
};

export default Performance;
