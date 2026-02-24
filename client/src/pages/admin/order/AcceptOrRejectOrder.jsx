import { useDispatch } from "react-redux"
import { Button } from "../../../components/button/Button"
import { closeModal, openModal } from "../../../redux/GlobalModalSlice"
import { UpdateOrderStatus } from "./api/UpdateOrderStatus"
import { useEffect, useState } from "react"
import Spinner from "@/components/Spinner"

/* eslint-disable react/prop-types */
const AcceptOrRejectOrder = ({status, id}) => {
    const [responseStatus, setResponseStatus ] = useState(null)
    const mutateOrderStatus = UpdateOrderStatus(setResponseStatus, status)
    const dispatch = useDispatch()

    const handleUpdateStatus = () =>{
        mutateOrderStatus.mutate({status: status == 'CONFIRMED'? 'CONFIRMED': status == 'SHIP'? 'SHIPPED' : 'MERCHANT_CANCELLED', id})
    }

    useEffect(()=>{
      if(mutateOrderStatus.isLoading && responseStatus == null){
        dispatch(openModal({component: <Spinner isLoading={mutateOrderStatus.isLoading && responseStatus == null}/>}))
      }
    }, [mutateOrderStatus.isLoading, responseStatus])
  return (
    <div className="w-[300px] p-6 flex flex-col items-center h-[250px] bg-white rounded-md shadow-md shadow-gray-400]">
      <p className="text-lg text-center text-gray-600 mt-10">You are about to {status.toLowerCase()} this order.</p>
      <div className="flex gap-2 mt-6">
        <Button onClick={()=>{
            dispatch(closeModal())
        }} className={'!bg-red-600'}>Cancel</Button>
        <Button 
           onClick={()=> handleUpdateStatus()}
        className={'!bg-gray-600'}>Continue</Button>
      </div>
    </div>
  )
}

export default AcceptOrRejectOrder