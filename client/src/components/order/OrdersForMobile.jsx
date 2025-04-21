/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { CameraIcon, X } from "lucide-react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import FetchUserOrder from "./api/FetchUserOrder";
import { useDispatch, useSelector } from "react-redux";
import {  format } from 'date-fns'
import { euro } from "../../constants/Currency";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { addUserOrderItem } from "../../redux/UserOrderItem";
import OrderItem from "./OrderItem";
import { MdArrowBack } from "react-icons/md";
import CancelOrder from "./CancelOrder";
import Spinner from "../Spinner";
import OrderCancelled from "./OrderCancelled";
import OrderCancelledFailed from "./CancelOrderFailed";

const OrdersForMobile = ({ userOrdersOpened, setUserOrdersOpened }) => {
    const navigate = useNavigate()
    const [size, setSize] = useState(5)
    const dispatch = useDispatch()
    const [userOrderView, setUserOrderView] = useState("ORDERS")
    const user = useSelector(state => state.user)?.user
    const { data: orders, refetch, isLoading } = FetchUserOrder({ filters: { customerId: user.id, size } })
    const queryClient = useQueryClient()
    useEffect(() => {
        setSize(5)
        setUserOrderView("ORDERS")
    }, [])
    return (
        <div className="relative w-full  p-2">
            {/* Sidebar Menu */}
            <div
                className=" h-full w-full bg-white shadow-lg z-50 p-5 flex flex-col"
            >
                {/* Close Button */}

                {/* Navigation Links */}
                <div className="w-full pb-8">
                    <div className="mb-6 border-b pb-4">
                    <h1 className="text-xl font-semibold ">Orders</h1>
                    {userOrderView == "DETAILS" && <button 
                    onClick={()=> setUserOrderView("ORDERS")} className="mt-1 flex items-center gap-2 py-2 text-sm text-gray-600"><MdArrowBack/>Go Back</button>}
                    </div>
                       <div className="w-full flex flex-col ">
                        {
                        
                        isLoading ? <Spinner style={'!w-12 !h-12 mx-auto'} isLoading={isLoading}/> :
                        orders?.length < 1 ?
                            <div className="w-full mt-5 mb-8">
                                <p>No orders yet</p>
                                <Button onClick={() => {
                                    setUserOrdersOpened(false)
                                    navigate("/")
                                }} className={"w-full !rounded-full !bg-primary !py-2 mt-16 text-white"}>
                                    Return to shop
                                </Button>
                            </div> :
                            userOrderView == "ORDERS"?<div className="w-full">
                                {
                                    orders?.rows?.map((order) => (
                                        <div className="w-full  items-center gap-3 text-sm grid grid-cols-3 py-3 border-b border-gray-300" key={order.id}>
                                            <div className="text-[0.9rem] col-span-3 text-gray-500">
                                                {format(new Date(order.createdAt), 'dd-MMM-yyyy')}</div>

                                            <div className={`py-1 rounded-lg `}>
                                            <span className={`text-sm ${order?.status == "PENDING" ? 'text-orange-500' : order?.status == "ACCEPTED" ? "text-green-700" : "text-red-700"}`}>{order?.status}</span>                                            </div>
                                            <div className="text-[1.2rem] font-bold">
                                                {euro}{order.amount}
                                            </div>
                                            <div>
                                                <button onClick={()=>{
                                                    setUserOrderView("DETAILS")
                                                    dispatch(addUserOrderItem({id: order.id}))
                                                }} className="rounded-full px-4 py-1 border text-red-500 border-red-500">Details</button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="mb-10">
                                    {(orders?.totalItems - size) > 1 && <button onClick={() => {
                                        setSize(size + 5)
                                        refetch()
                                    }} className="w-full mt-4 py-2 border border-gray-500 text-sm">SHOW MORE</button>
                                    
                                }
                                </div>
                            </div>
                            :  userOrderView == "CANCEL"?<CancelOrder  {...{setUserOrderView}}/> 
                            : userOrderView == "CANCELLED" ? <OrderCancelled {...{setUserOrderView}}/> 
                            : userOrderView == "CANCELFAILED" ? <OrderCancelledFailed {...{setUserOrderView}}/> 
                            : <OrderItem {...{setUserOrderView}}/>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrdersForMobile;
