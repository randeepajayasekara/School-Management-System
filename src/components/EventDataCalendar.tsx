"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { getDatabase, ref, get } from "firebase/database";

export function EventDataCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [events, setEvents] = React.useState<any[]>([]);
  const db = getDatabase();

  React.useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = ref(db, "eventsData");
      const snapshot = await get(eventsRef);
      if (snapshot.exists()) {
        const eventsData = snapshot.val();
        const eventsArray = Object.values(eventsData);
        const shuffledEvents = eventsArray.sort(() => 0.5 - Math.random());
        setEvents(shuffledEvents.slice(0, 3));
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-md border-2 border-gray-200 dark:border-gray-800 z-10">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md shadow w-full flex justify-center"
      />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 dark:border-gray-700 border-t-4 odd:border-t-CustomSky dark:odd:border-t-CustomSky even:border-t-CustomPurple dark:even:border-t-CustomPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600 dark:text-gray-200">
                {event.title}
              </h1>
              <span className="text-gray-300 text-xs dark:text-gray-200">
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm dark:text-gray-200">
              {event.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
