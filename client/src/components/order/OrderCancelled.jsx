/* eslint-disable react/prop-types */
import { MdOutlineDone } from 'react-icons/md'
import { Button } from '../button/Button'

const OrderCancelled = ({setUserOrderView}) => {
  return (
    <div>
      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-8 rounded-full bg-primary"><MdOutlineDone className="text-[2rem] text-white"/></div>
      <p>Order successfully cancelled and payment will be refunded before 48 hours. If no refund is made by that time, please kindly reach out to us.</p>
    <Button className={'mt-8'} onClick={()=>setUserOrderView("ORDERS")}>Complete</Button>
    </div>
  )
}

export default OrderCancelled