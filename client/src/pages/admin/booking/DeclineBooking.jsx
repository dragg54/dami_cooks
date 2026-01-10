import { useDispatch } from "react-redux"
import { Button } from "../../../components/button/Button"
import { useState } from "react"
import { UpdateEventBookingStatus } from "./api/UpdateEventBookingStatus"

/* eslint-disable react/prop-types */
const DeclineBooking = ({status, id}) => {
    const [responseStatus, setResponseStatus ] = useState()
    const mutateOrderStatus = UpdateEventBookingStatus({setResponseStatus, id})

    const handleUpdateStatus = () =>{
        mutateOrderStatus.mutate({bookingStatus: "declined"})
    }
  return (
    <div className="w-[500px] p-6 flex flex-col items-center h-[250px] bg-white rounded-md shadow-md shadow-gray-400]">
      <p className="text-lg text-center text-gray-600 mt-10">You are about to decline this order.</p>
      <div className="flex gap-2 mt-6">
        <Button 
           onClick={()=> handleUpdateStatus()}
        className={'bg-gray-600'}>Continue</Button>
      </div>
    </div>
  )
}

export default DeclineBooking