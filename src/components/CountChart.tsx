"use client";

import {
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

const chartData = [
  { gender: "girls", count: 275, fill: "var(--color-girls)" },
  { gender: "boys", count: 200, fill: "var(--color-boys)" },

];

const chartConfig = {
  count: {
    label: "Count",
  },
  girls: {
    label: "Girls",
    color: "hsl(var(--chart-1))",
  },
  boys: {
    label: "Boys",
    color: "hsl(var(--chart-2))",
  },

} satisfies ChartConfig;


const CountChart = () => {

  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <div className="bg-white rounded-xl w-full h-fit p-4 border-2 border-gray-200">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>
      {/* CHART */}
      <div className="relative w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-full]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[hsl(var(--chart-2))] rounded-full" />
            <h1 className="font-bold">{chartData.find(data => data.gender === "boys")?.count.toLocaleString()}</h1>
            <h2 className="text-xs text-gray-500">Boys ({((chartData.find(data => data.gender === "boys")?.count || 0) / totalCount * 100).toFixed(2)}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[hsl(var(--chart-1))] rounded-full" />
          <h1 className="font-bold">{chartData.find(data => data.gender === "girls")?.count.toLocaleString()}</h1>
          <h2 className="text-xs text-gray-500">Girls ({((chartData.find(data => data.gender === "girls")?.count || 0) / totalCount * 100).toFixed(2)}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
