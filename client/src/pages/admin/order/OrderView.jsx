/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../components/button/Button"
import OrderItemTable from "./components/OrderItemTable"
import { FetchOrder } from "./api/FetchOrder"
import { openModal } from "../../../redux/GlobalModalSlice"
import AcceptOrRejectOrder from "./AcceptOrRejectOrder"
import { useLocation } from "react-router-dom"
import { CiDeliveryTruck } from "react-icons/ci";

const OrderView = () => {
  const dispatch = useDispatch()
  const orderId = useSelector(state => state.globalModal).props.orderId
  
  const orderItemData = FetchOrder(orderId)
  if (!orderItemData) {
    return <>Loading...</>
  }
  return (
    <div onClick={(e) => e.stopPropagation()} className='md:w-[550px] max-h-[600px] overflow-hidden -mt-10  text-gray-500 w-[95%] md:p-6 p-4 min-h-[300px] bg-white rounded-md shadow-md shadow-gray-400'>
      <p className='font-semibold text-xl bg-gray-300 p-2 text-gray-900 pb-3 w-full border-b border-gray-300'>Customer Order</p>
      <p className='text text-lg mt-5 font-bold text-gray-900'>{orderItemData.user?.firstName + " " + orderItemData.user?.lastName} </p>
      <p className=' mt-3 font-semibold text-gray-900 underline'>Shipping Details </p>
      <p className="mt-3 text-xs"><span className="font-semibold text-gray-900">Email</span>: {orderItemData.shipping?.email || orderItemData.user?.email || 'N/A'}</p>
      <p className='mt-2 text-xs'><span className="font-semibold text-gray-900">Address</span>: {orderItemData.shipping?.address}</p>
      <p className='mt-2 text-xs'><span className="font-semibold text-gray-900">City</span>: {orderItemData.shipping?.city}</p>
      <p className='mt-2 text-xs'><span className="font-semibold text-gray-900">Phone</span>: {orderItemData.shipping?.phone}</p>
      <p className='mt-2 text-xs'><span className="font-semibold text-gray-900">Order Status</span>: <span className="p-1 text-gray-800 text-xs bg-green-200 rounded-full">{orderItemData.status}</span></p>
      <div className="w-full  border border-gray-300 my-5"></div>
      <p className=' text-base font-bold  text-gray-900'>Order Items</p>
      <OrderItemTable {...{ orderItems: orderItemData?.orderItems }} />
    {
      orderItemData?.status == "PENDING" ? 
      <div className="mt-6 ml-auto gap-2 flex">
        <Button onClick={() => {
          dispatch(openModal({ component: <AcceptOrRejectOrder {...{ status: 'REJECT',  id: orderItemData.id }} /> }))
        }} className={'!bg-gray-400 !rounded-full !w-[100px]'}>Reject</Button>
        <Button onClick={() => {
          dispatch(openModal({ component: <AcceptOrRejectOrder {...{ status: 'ACCEPT', id: orderItemData.id }} /> }))
        }} className={'!bg-green-600 !rounded-full !w-[100px]'}>Accept</Button>
      </div>
      : <Button
        className={'flex !w-[120px] !rounded-full !ml-auto justify-center items-center gap-2'}
         onClick={() => {
        dispatch(openModal({ component: <AcceptOrRejectOrder {...{ status: 'SHIP', id: orderItemData.id }} /> }))
      }}><CiDeliveryTruck className="text-2xl"/> Ship</Button>
    }
    </div>
  )
}

export default OrderView