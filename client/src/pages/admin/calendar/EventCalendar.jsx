import React, { useEffect, useState } from "react";
import TodayEvent from "./TodayEvent";
import { LuCalendarRange } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { format } from "date-fns";
import AddEvent from "./AddEvent";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FetchAllEventBookings } from "./api/FetchEventBookings";
// Example events data (now managed in state)

function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Helper to pick a color based on event index or count
const eventColors = [
  "bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 border-pink-200 text-pink-700",
  "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 border-yellow-200 text-yellow-700",
  "bg-gradient-to-br from-green-200 via-green-100 to-green-50 border-green-200 text-green-700",
  "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 border-gray-200 text-gray-700",
  "bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 border-purple-200 text-purple-700",
];

const EventCalendar = () => {
  const [eventsForToday, setEventsForToday] = useState([]);
 const { data: eventBookings, refetch: eventBookingsRefetch, isLoading: eventBookingLoading } = FetchAllEventBookings({filter: {status: "booked"} })

//   const { mutate: createEventMutation } = useMutation(createEvent, {
//     onSuccess: () => {
//       setModalOpen(false);
//     },
//     onError: (err) => {
//       setModalOpen(false)
//       setError(err?.response?.message)
//     }
//   })
  function getEventsForDay(events, dateStr) {
    return events?.filter((e) => format(e.eventDate, "yyyy-MM-dd") === dateStr);
  }



  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);


  useEffect(() => {
    if (!eventBookingLoading) {
      setEvents(eventBookings?.rows)
      setEventsForToday(getEventsForDay(eventBookings?.rows, format(new Date(), "yyyy-MM-dd")))
    }
  }, [eventBookings, eventBookingLoading])

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventdescription, setEventdescription] = useState("");
  const [error, setError] = useState("");
  const [eventTime, setEventTime] = useState("");

  const days = getMonthDays(currentYear, currentMonth);

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const eventTextColors = [
  "!text-[#e08955]",
  "!text-[#689ab8]",
  "!text-[#32cd30]",
  "!text-[#8155ba]",
  "!text-[#e5c101]",
  "!text-[#b10450]",
  "!text-[#d37506]",
];


  const user = useSelector((state) => state.user);

  // For grid alignment
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Today's events
  const todayStr = new Date().toISOString().slice(0, 10);
  //   const todaysEvents = getEventsForDay(events, todayStr);

  // Handle day tile click
  const handleDayClick = (date) => {
    // Remove time for comparison
    const clicked = new Date(date);
    clicked.setHours(0, 0, 0, 0);
    if (clicked < today) {
      setError("You can only add events for today or later days.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    setSelectedDate(date);
    setEventdescription("");
    setModalOpen(true);
  };

  // Handle event creation
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (eventdescription.trim() && selectedDate) {
      const modifiedDate = new Date(selectedDate).setDate(selectedDate.getDate());
      const [hours, minutes] = eventTime.split(":").map(Number);
      const validModifiedDate = new Date(modifiedDate);
      validModifiedDate.setHours(hours + 1);
      validModifiedDate.setMinutes(minutes);
      validModifiedDate.setSeconds(0);
      validModifiedDate.setMilliseconds(0);

      setEvents([
        ...events,
        {
          eventDate: validModifiedDate.toISOString(),
          eventDescription: eventdescription.trim(),
        },
      ]);
    //   createEventMutation({
    //     eventDate: validModifiedDate.toISOString(),
    //     eventDescription: eventdescription.trim()
    //   })
      setEventdescription("");
      setSelectedDate(null);
      setEventTime("");
    }
  };

  function getCalendarCells() {
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const calendarCells = [
      ...Array(startDay).fill(null),    // leading blanks for alignment
      ...days
    ];

    while (calendarCells.length < 35) {
      calendarCells.push(null);
    }
    return calendarCells;
  }

  return (
    <div className="flex flex-col md:flex-row w-full  px-1 max-w-5xl mx-auto  gap-x-3">
      {/* Calendar */}
      <div className="flex-1 ">
        <div className="h-14 2-full rounded-lg shadow-gray-300 bg-white mb-1 p-3 flex flex-col justify-center">
           <p className="font-bold">Calendar</p>
           <p className="text-xs text-gray-400">View and track calendar events</p>
        </div>
        <div className="bg-white rounded-2xl h-[86%] md:h-[85%] overflow-hidden shadow-xl border border-gray-100 p-3 md:p-8 pb-3">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrev}
              className="text-gray-600 hover:bg-gray-100 rounded-full p-2 transition border border-gray-200"
              aria-label="Previous Month"
            >
             <IoIosArrowBack />
            </button>
            <h2 className=" font-bold text-gray-700 tracking-tight flex items-center gap-2">
              <LuCalendarRange className="  -mt-1" />
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={handleNext}
              className="text-gray-600 hover:bg-gray-100 rounded-full p-2 transition border border-gray-200"
              aria-label="Next Month"
            >
             <IoIosArrowForward />
            </button>
          </div>
          {error && (
            <div className="mb-4 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded py-2">
              {error}
            </div>
          )}
          <div className="grid grid-cols-7 justify-items-center gap-0 text-center text-gray-gray font-semibold mb-3 border border-gray-300 py-2 rounded-md shadow-sm bg-red-100">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 border-l border-t border-gray-300">
            {/* Empty cells for first week */}
            {
              getCalendarCells().map((day, index) => {

                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="relative border border-gray-200 min-h-[70px] h-[70px] bg-gray-50"
                    ></div>
                  );
                }
                const dateStr = day.toISOString().slice(0, 10);
                const dayEvents = getEventsForDay(events, format(day, "yyyy-MM-dd"));
                const isToday =
                  day.getDate() === today.getDate() &&
                  day.getMonth() === today.getMonth() &&
                  day.getFullYear() === today.getFullYear();

                // If the day has events, pick a color based on the first event (for variety)
                const eventColorClass =
                  dayEvents?.length > 0
                    ? eventColors[dayEvents[0].name?.length % eventColors.length]
                    : "";

                return (
                  <div
                    key={dateStr}
                    onClick={() => handleDayClick(day)}
                    className={`relative border  border-gray-100 shadow-sm shadow-gray-200 min-h-[70px] h-[70px] flex flex-col items-center justify-start px-2 py-1 transition-all cursor-pointer
                    ${isToday ? " shadow-lg" : dayEvents?.length > 0 ? eventColorClass + " border-2 shadow" : "bg-white border-gray-100"}
                    hover:bg-gray-100 hover:border-gray-300`}
                    title={day >= today ? "Click to add event" : "Cannot add event to past days"}
                  >
                    <div
                      className={`font-bold text-base mb-1 ${isToday ? "text-gray-900" : dayEvents?.length > 0 ? "text-gray-900" : "text-gray-500"
                        }`}
                    >
                      {day.getDate()}
                    </div>
                    {dayEvents?.map((event, idx) => {
                      const eventTextColor =
                        eventTextColors[idx % eventTextColors.length];
                      return(
                        <div
                          key={idx}
                          className={`w-full mt-1 flex items-center text-xs rounded px-1 py-0.5 truncate font-medium border ${eventTextColor}
                        ${isToday
                              ? "bg-white/80 text-gray-700 border-gray-200"
                              : dayEvents?.length > 0
                                ? "bg-white/70 border-white/40"
                                : "bg-white text-gray-700 border-gray-100"}
                          `}
                          title={`${event.name} ${event.eventStartTime}`}
                      >
                        <span className="inline-block align-middle mr-1">
                          <svg width="8" height="8" className="inline" fill="currentColor">
                            <circle cx="4" cy="4" r="4" />
                          </svg>
                        </span>
                        {event.name}
                      </div>
                    )})}
                    {/* Dot indicator for days with events */}
                    {dayEvents?.length > 0 && (
                      <span className={`absolute top-2 right-2 ${isToday ? "bg-white" : ""} rounded-full`}>
                        <svg width="8" height="8" fill="#747474">
                          <circle cx="4" cy="4" r="4" />
                        </svg>
                      </span>
                    )}
                    {/* Add icon for empty days */}
                    {dayEvents?.length === 0 && (
                      <span className="absolute bottom-2 right-2 opacity-30 pointer-events-none">
                        <svg width="16" height="16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="#747474" strokeWidth="1" />
                          <path d="M8 5v6M5 8h6" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Today's Events */}
      <TodayEvent todaysEvents={eventsForToday} today={today} />

      {/* Modal for creating event */}
      {modalOpen && <AddEvent {...{ selectedDate, eventTime, handleCreateEvent, setEventTime, setEventdescription, eventdescription, setModalOpen }} />}
    </div>
  );
};

export default EventCalendar;