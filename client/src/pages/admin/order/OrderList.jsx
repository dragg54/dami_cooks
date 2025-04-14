/* eslint-disable react-hooks/exhaustive-deps */
import CustomTable from '../../../components/table/Table'
import order from '../../../temps/order.json'
import { FetchOrders } from './api/fetchAllOrders'
import { format } from 'date-fns'
import OrderView from './OrderView'
import { useEffect, useMemo, useState } from 'react'
import MerchantEmptyState from '../../../components/MerchantEmptyState'
import { UpdateNotificationStatus } from './api/UpdateNotificationStatus'
import { useDispatch } from 'react-redux'
import { readNotifications } from '../../../redux/NotificationSlice'

const OrderList = () => {
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState("")   
  const [fetchEnabled, setFetchEnabled] = useState(true)
  const mutateNotificationStatus = UpdateNotificationStatus()
  const [filterValues, setFilterValues] = useState({
    'CUSTOMER NAME': {id: "customerName", value: null},
    'CITY':  {id:"city", value: null},
    'STATUS': {id: "status", value: null},
    'FROM DATE': {id: "fromDate", value: null},
    'TO DATE': {id: "toDate", value: null}
  })
   const filters = useMemo(() => ({
    size,
    page,
    searchText: debouncedQuery,
    customerName: filterValues["CUSTOMER NAME"].value,
    city: filterValues["CITY"].value,
    status: filterValues["STATUS"].value,
    fromDate: filterValues["FROM DATE"].value,
    toDate: filterValues["TO DATE"].value,
  }), [size, page, debouncedQuery, fetchEnabled]);


  const {data:orderData, refetch, isLoading} = FetchOrders({filters})
  const dispatch = useDispatch()

  let processedData = orderData?.rows?.map((dta)=>(
    {
      orderId: dta.id,
      "Customer Name": dta.user?.firstName + " " + dta.user?.lastName,
      status: dta.status,
      "Payment Method": 'CARD',
      "city": dta.shipping?.city,
      amount: dta.amount,
       "Ordered At": format(new Date(dta.createdAt), 'dd-MM-yyy HH:mm')
    }
  ))

  const handleEnterKey = (e) =>{
    if(e.key == "Enter"){
      e.preventDefault()
      setFetchEnabled(true)
     refetch()
   }
  }

  useEffect(()=>{
    mutateNotificationStatus.mutate()
    dispatch(readNotifications())
  },[])

  return (
<div className="w-full">
     <CustomTable
       {...{caption: "Orders", tableData: processedData ,setFetchEnabled,
         placeholder: "Search orders",canEdit: true, isLoading, updateLink: "/update-order-status",
         currentPage: page, debouncedQuery, setDebouncedQuery,
         totalPages: orderData?.totalPages, filterValues,handleEnterKey, fetchEnabled,
         onPageChange:setPage,setFilterValues,
          updateComponent: <OrderView />}}/>
    </div>  )
}

export default OrderList