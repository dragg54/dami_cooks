/* eslint-disable react/prop-types */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { format, formatDate, parse } from 'date-fns'
import { FetchAllEventBookingItems } from './api/FetchEventBookingItems'
import { Euro } from '@/constants/Currency'
import { RiFileList2Line } from "react-icons/ri";


const EventdataItems = ({ data }) => {
  const location = useLocation()
  const { data: items, refetch, isLoading } = FetchAllEventBookingItems({ id: data.data.id, filters: {} })
  if (!data) return <div className="text-center mt-10">No data selected</div>

  // Calculate total price of all items
  const totalPrice = items?.reduce((acc, item) => acc + item.totalPrice, 0) || 0

  return (
    <div className="w-4/5 mx-auto bg-white rounded-lg shadow-md shadow-gray-300 p-6 mt-6 relative"
      style={{
        backgroundImage: "url('/images/logo.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4 inline-flex items-center gap-2">Booking Summary <RiFileList2Line /></h1>
      <div className='my-3 border w-full'></div>

      {/* data Info */}
      <div className=' relative bg-white/90 backdrop-blur-sm '>
        <div className="grid md:grid-cols-2 gap-4 mb-3 ">
          <div>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Client Name:</span> {data?.data.name}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Email:</span> {data?.data.email}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">WhatsApp:</span> {data?.data.whatsapp}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Mobile Number:</span> {data?.data["Mobile Number"]}</p>
          </div>
          <div>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Event Type:</span> {data?.data["Event Type"]}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Catering Type:</span> {data?.data["Catering Type"]}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Guest Count:</span> {data?.data["Guest Count"]}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Event Date:</span> {data?.data["Event Date"] && format(parse(data?.data["Event Date"], "dd-MM-yyyy", new Date()), "dd MMMM yyyy")}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Event Time:</span> {data?.data["Event Start Time"]} - {data?.data["Event End Time"]}</p>
          </div>
          <div className="md:col-span-2">
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Event Location:</span> {data?.data["Event Location"]}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Event Address:</span> {data?.data["Event Address"]}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Dietary Requirements:</span> {data?.data["Dietary Requirements"] || "None"}</p>
            <p className='text-gray-500 mb-1'><span className="!font-semibold text-gray-800">Food Package References:</span> {data?.data["Food Package References"] || "None"}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border border-gray-300"></div>

        {/* data Items Table */}
        <h2 className="text-xl font-semibold mb-2">Booking Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200">
            <thead>
              <tr className="bg-red-100">
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Unit Price</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.item}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border"><Euro />{item.unitPrice.toLocaleString()}</td>
                  <td className="p-2 border"><Euro />{(item.quantity * item.unitPrice).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-semibold">
                <td colSpan="3" className="p-2 border text-right">Grand Total</td>
                <td className="p-2 border"><Euro />{totalPrice.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EventdataItems
