"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { week: "Mon", present: 60, absent: 40 },
  { week: "Tue", present: 70, absent: 60 },
  { week: "Wed", present: 90, absent: 75 },
  { week: "Thu", present: 90, absent: 75 },
  { week: "Fri", present: 65, absent: 55 },
];

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const AttendanceChart = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 h-fit border-2 border-zinc-300 dark:border-slate-800 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="present" fill="var(--color-present)" radius={4} />
          <Bar dataKey="absent" fill="var(--color-absent)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AttendanceChart;
