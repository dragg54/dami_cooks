import CustomTable from '../../../components/table/Table'
import order from '../../../temps/order.json'
import { FetchOrders } from './api/fetchAllOrders'
import { format } from 'date-fns'
import OrderView from './OrderView'
import { useState } from 'react'

const OrderList = () => {
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const orderData = FetchOrders({filters: {size, page}})
  let processedData = orderData?.rows?.map((dta)=>(
    {
      orderId: dta.id,
      amount: dta.amount,
      status: dta.status,
      "Customer Name": dta.user.firstName + " " + dta.user.lastName,
      "Payment Method": 'CARD',
       "Ordered At": format(new Date(dta.createdAt), 'dd-MM-yyy HH:mm')
    }
  ))
  if(!processedData){
      processedData = [{}]
  }
  return (
<div className="w-auto">
     <CustomTable
       {...{caption: "Orders", tableData: processedData ,
         placeholder: "Search orders",canEdit: true,
         currentPage: page,
         totalPages: orderData?.totalPages,
         onPageChange:setPage,
          updateComponent: <OrderView />}}/>
    </div>  )
}

export default OrderList