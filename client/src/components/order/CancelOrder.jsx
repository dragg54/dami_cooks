/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { Button } from "../button/Button"
import { CancelOrderAPI } from "./api/CancelOrderAPI"
import Spinner from "../Spinner"

const CancelOrder = ({setUserOrderView}) => {
    const orderItem = useSelector(state => state.userOrderItem)
    const { mutate, isLoading } = CancelOrderAPI(setUserOrderView)
    const handleOrderCancellation = () =>{
        mutate({id: orderItem?.id, status: "cancelled"})
    }
  return (
    <div >
        <p className="text-lg text-gray-600">Are you sure you want to cancel this order?</p>
        <div className="flex gap-2 item-center mt-8">
        <Button onClick={()=> setUserOrderView("DETAILS")} className={'!w-[100px]'}>
           No
        </Button>
        <Button disabled={isLoading} className={'!w-[100px]'} onClick={()=> handleOrderCancellation()}>
           {isLoading ? <Spinner isLoading={isLoading} style={'!w-5 !h-5 mx-auto'}/> : " Yes, Cancel"}
        </Button>
        </div>
    </div>
  )
}

export default CancelOrder