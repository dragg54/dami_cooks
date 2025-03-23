import { useDispatch } from "react-redux"
import { Button } from "../../../components/button/Button"
import { closeModal } from "../../../redux/GlobalModalSlice"
import { UpdateOrderStatus } from "./api/UpdateOrderStatus"
import { useState } from "react"

/* eslint-disable react/prop-types */
const AcceptOrRejectOrder = ({status, id}) => {
    const [responseStatus, setResponseStatus ] = useState()
    const mutateOrderStatus = UpdateOrderStatus(setResponseStatus, status)
    const dispatch = useDispatch()

    const handleUpdateStatus = () =>{
        mutateOrderStatus.mutate({status: status == 'ACCEPT'? 'ACCEPTED': 'REJECTED', id})
    }
  return (
    <div className="w-[300px] p-6 flex flex-col items-center h-[250px] bg-white rounded-md shadow-md shadow-gray-400]">
      <p className="text-lg text-center text-gray-600 mt-10">You are about to {status.toLowerCase()} this order.</p>
      <div className="flex gap-2 mt-6">
        <Button onClick={()=>{
            dispatch(closeModal())
        }} className={'!bg-gray-600'}>Cancel</Button>
        <Button 
           onClick={()=> handleUpdateStatus()}
        className={'bg-gray-600'}>Continue</Button>
      </div>
    </div>
  )
}

export default AcceptOrRejectOrder