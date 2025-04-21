/* eslint-disable react/prop-types */
import { MdOutlineErrorOutline } from "react-icons/md";
import { Button } from '../button/Button'

const OrderCancelledFailed = ({setUserOrderView}) => {
  return (
    <div>
      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-8 rounded-full bg-primary"><MdOutlineErrorOutline className="text-[2rem] text-white"/></div>
      <p>Order cannot be cancelled at this moment. Please try again later.</p>
    <Button className={'mt-8'} onClick={()=>setUserOrderView("ORDERS")}>Go Back</Button>
    </div>
  )
}

export default OrderCancelledFailed