/* eslint-disable react/prop-types */
import { format,  } from 'date-fns';
import React from 'react'
import { BsCalendar2Event } from "react-icons/bs";

const TodayEvent = ({todaysEvents, today}) => {
 
  function formatTimeTo24Hour(date) {
    const modifiedDate = new Date(date).setHours(new Date(date).getHours() - 1);
    const validDate = new Date(modifiedDate);
    const timeString = format(validDate, "HH:mm a");
    return timeString
  }

  return (
     <div className="w-full hidden md:block md:w-80 flex-shrink-0 h-[95%]">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-6 h-full flex flex-col">
          <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
            <BsCalendar2Event size={20} />
            Today's Events
          </h3>
          {todaysEvents?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-base">
              <svg width="48" height="48" fill="none" className="mb-2">
                <circle cx="24" cy="24" r="24" fill="#e0e7ef" />
                <path d="M16 24h16M24 16v16" stroke="#e80000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              No events for today.
            </div>
          ) : (
            <ul className="space-y-4">
              {todaysEvents?.map((event, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 bg-white border border-red-200 rounded-xl px-4 py-3 shadow transition hover:shadow-lg"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold text-lg shadow">
                    <svg width="20" height="20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#e80000" />
                      <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" dy=".3em">
                        {event.name && event.name[0]}
                      </text>
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="text-gray-600 font-semibold text-base">{event.name}</div>
                    <div className="text-xs text-gray-400 opacity-70 mt-2">Today, {event.eventStartTime}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  )
}

export default TodayEvent