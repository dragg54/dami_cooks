/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../components/button/Button"
import OrderItemTable from "./components/OrderItemTable"
import { FetchOrder } from "./api/FetchOrder"
import { openModal } from "../../../redux/GlobalModalSlice"
import AcceptOrRejectOrder from "./AcceptOrRejectOrder"

const OrderView = () => {
  const globalModal = useSelector(state => state.globalModal)
  const dispatch = useDispatch()
  const props = JSON.parse(globalModal?.props)
  const orderId = props.row._valuesCache?.orderId
  const orderItemData = FetchOrder(orderId)
  if (!orderItemData) {
    return <>Loading...</>
  }
  return (
    <div onClick={(e) => e.stopPropagation()} className='md:w-[550px] max-h-[700px]  text-gray-500 w-[95%] md:p-6 p-4 min-h-[470px] bg-white rounded-md shadow-md shadow-gray-400'>
      <h1 className='font-semibold text-2xl bg-gray-300 p-2 text-gray-900 pb-3 w-full border-b border-gray-300'>Customer Order</h1>
      <p className='text text-xl mt-5 font-bold text-gray-900'>{orderItemData.user?.firstName + " " + orderItemData.user?.lastName} </p>
      <p className=' mt-3 font-semibold text-gray-900 underline'>Shipping Details </p>
      <p className="mt-3 text-sm"><span className="font-semibold text-gray-900">Email</span>: {orderItemData.shipping?.email || orderItemData.user?.email || 'N/A'}</p>
      <p className='mt-2 text-sm'><span className="font-semibold text-gray-900">Address</span>: {orderItemData.shipping?.address}</p>
      <p className='mt-2 text-sm'><span className="font-semibold text-gray-900">City</span>: {orderItemData.shipping?.city}</p>
      <p className='mt-2 text-sm'><span className="font-semibold text-gray-900">Phone</span>: {orderItemData.shipping?.phone}</p>
      <p className='mt-2 text-sm'><span className="font-semibold text-gray-900">Order Status</span>: <span className="p-1 text-gray-800 text-xs bg-gray-200 rounded-full">{orderItemData.status}</span></p>
      <div className="w-full  border border-gray-300 my-5"></div>
      <p className=' text-base font-bold  text-gray-900'>Order Items</p>
      <OrderItemTable {...{ orderItems: orderItemData?.orderItems }} />
      <div className="mt-6 ml-auto gap-2 flex">
        <Button onClick={() => {
          dispatch(openModal({ component: <AcceptOrRejectOrder {...{ status: 'REJECT',  id: orderItemData.id }} /> }))
        }} className={'!bg-red-700 !rounded-full'}>Reject</Button>
        <Button onClick={() => {
          dispatch(openModal({ component: <AcceptOrRejectOrder {...{ status: 'ACCEPT', id: orderItemData.id }} /> }))
        }} className={'!bg-green-700 !rounded-full'}>Accept</Button>
      </div>
    </div>
  )
}

export default OrderView