"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Income: 4000,
    Expense: 2400,
  },
  {
    name: "Feb",
    Income: 3000,
    Expense: 1398,
  },
  {
    name: "Mar",
    Income: 2000,
    Expense: 9800,
  },
  {
    name: "Apr",
    Income: 2780,
    Expense: 3908,
  },
  {
    name: "May",
    Income: 1890,
    Expense: 4800,
  },
  {
    name: "Jun",
    Income: 2390,
    Expense: 3800,
  },
  {
    name: "Jul",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Aug",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Sep",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Oct",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Nov",
    Income: 3490,
    Expense: 4300,
  },
  {
    name: "Dec",
    Income: 3490,
    Expense: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl w-full h-full p-4 border-2 border-sky-200 dark:border-slate-800 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <EllipsisHorizontalIcon className="w-6 h-6" />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#808286" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#808286" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#749caa"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="Expense"
            stroke="#9796c4"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
