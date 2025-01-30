"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const calendarEvents = [
  {
    title: "Math Class",
    start: new Date(2025, 1, 1, 9, 0, 0),
    end: new Date(2025, 1, 1, 10, 0, 0),
  },
  {
    title: "Science Class",
    start: new Date(2025, 1, 1, 11, 0, 0),
    end: new Date(2025, 1, 1, 12, 0, 0),
  },
  {
    title: "History Class",
    start: new Date(2025, 1, 2, 9, 0, 0),
    end: new Date(2025, 1, 2, 10, 0, 0),
  },
  {
    title: "English Class",
    start: new Date(2025, 1, 2, 11, 0, 0),
    end: new Date(2025, 1, 2, 12, 0, 0),
  },
];

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default BigCalendar;
