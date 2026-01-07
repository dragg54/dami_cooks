import { useParams } from "react-router-dom";
import { useState } from "react";
import { FetchAllEventBookingItems } from "./api/FetchAllEventBookingItems";
import { Euro } from "@/constants/Currency";
import { UpdateEventBookingStatus } from "./api/UpdateEventBookingStatus";
import { Button } from "@/components/button/Button";
import NotFoundPage from "@/pages/NotFoundPage";

const QuotationAcknowledgement = () => {
  const { id, userId } = useParams();
  const [ responseStatus, setResponseStatus ] = useState()

   const { data: items, refetch, isLoading } = FetchAllEventBookingItems({ id: id, filters: {} })
  const { mutate, isError, isLoading: updateEventBookingStatusLoading } = UpdateEventBookingStatus({ setResponseStatus, id, booking: items && items[0]?.eventBooking, bookingItems: items })
   
  const handleEventBookingStatus = (status) =>{
    mutate({bookingStatus: status})
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading quotation...</p>
      </div>
    );
  }

  if(items && items.length && (items[0].eventBooking.bookingStatus != "quote_computed" 
    && items[0].eventBooking.bookingStatus != "quote_accepted" || items.some(x => x.eventBooking.userId != userId))){
    return <NotFoundPage />
  }

  if (!items) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Unable to load quotation</p>
      </div>
    );
  }

  const isProcessing = isLoading;


  return (
    <div className="min-h-screen  px-4 ">
      <div className="max-w-5xl mx-auto py-10 pb-12 bg-white  rounded-xl shadow-sm p-6 space-y-8">

        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Event Booking Quotation
          </h1>
          <p className="text-sm text-gray-700">
            Please review and confirm your quotation
          </p>
        </div>

        {/* Event Details */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Event Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <Detail label="Event Type" value={items[0]?.eventBooking.eventType} />
            <Detail label="Event Date" value={items[0]?.eventBooking.eventDate} />
            <Detail label="Location" value={items[0]?.eventBooking.eventLocation} />
          </div>
        </section>

        {/* Items */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Quotation Items
          </h2>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-red-50 text-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left">Item</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Unit Price</th>
                  <th className="px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item.item}
                    </td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-center">
                     <Euro />{item.unitPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center font-medium">
                     <Euro />{item?.totalPrice?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <p className="text-right font-bold text-lg">Total: <span><Euro />{items[0].eventBooking?.bookingCharge}</span></p>

          {/* <div className="flex justify-end mt-4">
            <p className="text-xl font-semibold">
             <Euro />{quotation.totalAmount.toLocaleString()}
            </p>
          </div> */}
        </section>
 
        {/* Actions */}
        <div className="flex  sm:flex-row gap-4 w-full justify-end border-t pt-4">
          <Button
            onClick={() => handleEventBookingStatus("quote_rejected")}
            disabled={isProcessing}
            isLoading={isProcessing}
            className="px-6 py-3 !w-28 rounded-lg border !border-red-500 !text-red-600  !bg-white
                       !hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Decline
          </Button>

          <Button
            onClick={() => handleEventBookingStatus("quote_accepted")}
            disabled={isProcessing}
            isLoading = {isProcessing}
            className="px-6 py-3 rounded-lg !bg-red-600 text-white !w-28
                       !hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
             Accept 
          </Button>
        </div>
      </div>
    </div>
  );
};

/* Small reusable detail card */
const Detail = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default QuotationAcknowledgement;
