/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { format, formatDate, parse } from 'date-fns'
import { FetchAllEventBookingItems } from './api/FetchEventBookingItems'
import { Euro } from '@/constants/Currency'
import { RiFileList2Line } from "react-icons/ri";
import { CopyButton } from '@/components/button/CopyButton'
import { Button } from '@/components/button/Button'
import { closeModal, openModal } from '@/redux/GlobalModalSlice'
import { useDispatch } from 'react-redux'
import { TbPlaylistX } from "react-icons/tb";
import DeclineBooking from './DeclineBooking'
import { PiLink } from "react-icons/pi";


const EventBookingSummary = ({ data }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [responseStatus, setResponseStatus ] = useState()
  const { data: items, refetch, isLoading } = FetchAllEventBookingItems({ id: data.data.id, filters: {} })

  if (!data) return <div className="text-center mt-10">No data selected</div>

  // Calculate total price of all items
  const totalPrice = items?.reduce((acc, item) => acc + item.totalPrice, 0) || 0
  const handleUpdateBookingStatus = (status) =>{
    if(status == "declined"){
        dispatch(openModal({component: <DeclineBooking {...{id: data.data.id}}/>}))
    }
    else{
      navigate("/eventBooking", {state: {data}})
    }
  }
  return (
    <div onClick={(e) => e.stopPropagation()} className="w-4/5 mx-auto bg-white rounded-lg shadow-md shadow-gray-300 p-6 mt-6 relative"
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
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Client Name:</span> {data?.data.name}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Email:</span> {data?.data.email}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">WhatsApp:</span> {data?.data.whatsapp}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Mobile Number:</span> {data?.data["Mobile Number"]}</p>
          </div>
          <div>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Event Type:</span> {data?.data["Event Type"]}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Catering Type:</span> {data?.data["Catering Type"]}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Guest Count:</span> {data?.data["Guest Count"]}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Event Date:</span> {data?.data["Event Date"] && format(parse(data?.data["Event Date"], "dd-MM-yyyy", new Date()), "dd MMMM yyyy")}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Event Time:</span> {data?.data["Event Start Time"]} - {data?.data["Event End Time"]}</p>
          </div>
          <div className="md:col-span-2">
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Event Location:</span> {data?.data["Event Location"]}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Event Address:</span> {data?.data["Event Address"]}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Dietary Requirements:</span> {data?.data["Dietary Requirements"] || "None"}</p>
            <p className='text-gray-500 mb-1 text-xs'><span className="!font-semibold text-gray-800">Food Package References:</span> {data?.data["Food Package References"] || "None"}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border border-gray-300"></div>

        {/* data Items Table */}
        <h2 className="text-lg font-semibold mb-2">Booking Items</h2>
         {
          items && items.length > 0 ? 
          <div className="border border-gray-200 max-h-[200px] overflow-y-auto">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-1/4" />
              <col className="w-1/4" />
              <col className="w-1/4" />
              <col className="w-1/4" />
            </colgroup>

            <thead className="bg-red-100 sticky top-0 z-10">
              <tr>
                <th className="p-2 border text-left">Item</th>
                <th className="p-2 border text-left">Quantity</th>
                <th className="p-2 border text-left">Unit Price</th>
                <th className="p-2 border text-left">Total</th>
              </tr>
            </thead>

            <tbody>
              {items?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.item}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">
                    <Euro />{item.unitPrice.toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    <Euro />{(item.quantity * item.unitPrice).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-slate-100 font-semibold sticky bottom-0">
              <tr>
                <td colSpan="3" className="p-2 border text-right">
                  Grand Total
                </td>
                <td className="p-2 border">
                  <Euro />{totalPrice.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>:
         <div className=''>
          <p className='text-gray-400'>No item quotation yet.</p>
        </div>
         }
        <div className='flex justify-between'>
          <p className='mt-3 text-red-700 font-semibold flex items-center gap-2'>
            Event Link <PiLink />:
            <span className='flex gap-2 items-center'>
              <span className={`${(items && items[0]?.eventBooking?.eventBookingAcknowlegementUrl) && 'underline'} flex gap-x-3 items-center`}>{(items && items[0]?.eventBooking?.eventBookingAcknowlegementUrl) || "No event link generated."}</span>
              <span className='text-gray-900'>
                {items && items[0]?.eventBooking?.eventBookingAcknowlegementUrl && <CopyButton text={items && items[0]?.eventBooking?.eventBookingAcknowlegementUrl} />}
              </span>
            </span>
          </p>
          <div className="flex gap-2 mt-6">
            <Button
               disabled = {data.data["Booking Status"] != "quote_requested"}
               onClick={() => {
               handleUpdateBookingStatus("declined")
            }} className={'!bg-gray-100 border !border-gray-500 !text-gray-600'}>Decline</Button>
            <Button
             disabled = {data.data["Booking Status"] != "quote_requested"}
              onClick={() => handleUpdateBookingStatus("accepted")}
              className={'bg-gray-600'}>Accept</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventBookingSummary
