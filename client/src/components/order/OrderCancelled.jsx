/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from '../button/Button'

const OrderCancelled = ({setUserOrderView}) => {
  return (
    <div>
      <p>Order successfully cancelled and payment will be refunded before 48 hours. If no refund is made by that time, please kindly reach out to us.</p>
    <Button className={'mt-8'} onClick={()=>setUserOrderView("ORDERS")}>Complete</Button>
    </div>
  )
}

export default OrderCancelled