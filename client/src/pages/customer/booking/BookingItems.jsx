/* eslint-disable react/prop-types */
import { Euro } from '@/constants/Currency'
import React, { useState } from 'react'

const BookingItems = ({bookingItems}) => {
    const [showItems, setShowItems] = useState()
  return (
    <>
     <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowItems(!showItems)}
          className="text-sm font-medium text-red-600 underline hover:underline"
        >
          {showItems ? "Hide quotation details" : "Show quotation details"}
        </button>
      </div>

      {/* Collapsible Quotation Section */}
      {showItems && (
        <div className="mt-4 border rounded-md bg-gray-50 p-4">
          <h2 className="font-semibold text-lg mb-3">
            Quotation Breakdown
          </h2>

          <div className="space-y-3">
            {bookingItems?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-gray-500">
                    {item.quantity} × <Euro />{item.unitPrice.toLocaleString()}
                  </p>
                </div>

                <p className="font-semibold">
                  <Euro />{(item.quantity * item.unitPrice).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold text-base mt-4">
            <span>Total</span>
            <span>
              <Euro />{bookingItems[0]?.eventBooking?.bookingCharge}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default BookingItems