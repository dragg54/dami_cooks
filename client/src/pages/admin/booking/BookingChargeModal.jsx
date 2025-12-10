/* eslint-disable react/prop-types */
import { Euro } from "@/constants/Currency"
import { closeModal } from "@/redux/GlobalModalSlice"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

const BookingChargeModal = ({ onSave, booking }) => {
  const [charges, setCharges] = useState([
    { item: "", quantity: booking["Guest Count"], unitPrice: 0, totalPrice: 0, eventBookingId: booking.id }
  ])
 const dispatch = useDispatch()
  // Calculate totals automatically
  const updateCharge = (index, field, value) => {
    const updated = [...charges]
    updated[index][field] = value

    if (field === "quantity" || field === "unitPrice") {
      updated[index].totalPrice =
        (parseFloat(updated[index].quantity) || 0) *
        (parseFloat(updated[index].unitPrice) || 0)
    }

    setCharges(updated)
  }

  const onClose = () =>{
    dispatch(closeModal())
  }

  const addChargeRow = () => {
    setCharges([
      ...charges,
      { item: "", quantity: Number(booking["Guest Count"]), unitPrice: 0, totalPrice: 0, eventBookingId: booking.id }
    ])
  }

  const totalAmount = charges.reduce(
    (sum, c) => sum + parseFloat(c.totalPrice || 0),
    0
  )

  const handleSave = () => {
    onSave(totalAmount, charges)
    onClose()
  }

  if (!open) return null

  return (
    <div className=" bg-white !w-[700px]  md:w-[550px] rounded-lg p-7 shadow-xl  flex items-center justify-center z-50" onClick={(e)=>e.stopPropagation()}>
      <div className="bg-white ">
        <h2 className="text-xl font-semibold">
          Booking Charges 
        </h2>
        <p className="text-gray-600 mb-2"> {booking?.name}</p>
        <div className="my-1 border w-full"></div>
        {/* Charge Items */}
        <div className="space-y-4 mt-2 max-h-[300px] overflow-y-auto pr-2">
          {charges.map((c, index) => (
            <div key={index} className="grid grid-cols-4 gap-5 items-end mb-6">
              <div>
                <label className="text-sm font-semibold">Item</label>
                <input
                  type="text"
                  className="input !border-0 outline-none"
                  placeholder="Item name"
                  value={c.item}
                  onChange={(e) =>
                    updateCharge(index, "item", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Qty</label>
                <input
                  type="number"
                  className="input !border-0 outline-none"
                  value={c.quantity}
                  onChange={(e) =>
                    updateCharge(index, "quantity", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Unit Price</label>
                <input
                  type="number"
                  className="input !border-0 outline-none"
                  value={c.unitPrice}
                  onChange={(e) =>
                    updateCharge(index, "unitPrice", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Total</label>
                <input
                  type="number"
                  className="input !border-0 outline-none bg-gray-100"
                  value={c.totalPrice}
                  readOnly
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addChargeRow}
          className="mt-3 text-red-600 text-sm  border border-red-500 px-2 p-1"
        >
          + Add Another Item
        </button>

        {/* Summary */}
        <div className="mt-5 flex justify-between text-lg font-semibold">
          <span>Total Amount:</span>
          <span>{<Euro/>} {totalAmount.toLocaleString()}</span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Save Charges
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingChargeModal
