"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-md border-2 border-gray-200 dark:border-gray-800 z-10">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <EllipsisHorizontalIcon className="h-5 w-5"/>
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 dark:border-gray-700 border-t-4 odd:border-t-CustomSky dark:odd:border-t-CustomSky even:border-t-CustomPurple dark:even:border-t-CustomPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600 dark:text-gray-200">{event.title}</h1>
              <span className="text-gray-300 text-xs dark:text-gray-200">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm dark:text-gray-200">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;