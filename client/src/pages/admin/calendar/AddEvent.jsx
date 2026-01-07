/* eslint-disable react/prop-types */
import React from 'react'

const AddEvent = ({selectedDate, setEventTime, eventTime, handleCreateEvent, setEventdescription,eventdescription, setModalOpen}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-red-700">
              Add Event for {selectedDate && selectedDate.toLocaleDateString()}
            </h3>
            <form onSubmit={(e)=>handleCreateEvent(e)}>
             <div>
                 <input
                type="text"
                className="w-full border border-red-200 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Event description"
                value={eventdescription}
                onChange={e => setEventdescription(e.target.value)}
                autoFocus
                required
              />
             </div>
              <div>
                 <input 
                 value={eventTime}
                 onChange={(e)=> setEventTime(e.target.value)}
                className="w-full border border-red-200 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-200"
                 type="time"
              />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default AddEvent