"use client";

import {
  EllipsisHorizontalIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/24/outline";
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
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/firebase/firebase";

const FinanceChart = () => {
  const [data, setData] = useState<
    { name: string; Income: number; Expense: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, "financeData");
        onValue(
          dataRef,
          (snapshot) => {
            const data = snapshot.val();
            const financeData = data
              ? data.map((item: any) => ({
                  name: item.name,
                  Income: item.Income,
                  Expense: item.Expense,
                }))
              : [];
            setData(financeData);
            setLoading(false);
          },
          (error) => {
            setError(error.message);
            setLoading(false);
          }
        );
      } catch (err) {
        setError((err as any).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="justify-end h-6 w-6 animate-bounce"><CloudArrowDownIcon /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <Tooltip
            labelStyle={{ color: "#808286" }}
            formatter={(value: number) =>
              new Intl.NumberFormat("en").format(value)
            }
          />
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
