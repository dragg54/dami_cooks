import { useSelector } from "react-redux"
import FetchOrderDetails from "./api/FetchOrderDetails"
import Image from "../image/Image"
import { euro } from "../../constants/Currency"
import { MdRemoveShoppingCart } from "react-icons/md";

const OrderItem = ({setUserOrderView}) => {
    const userOrderItem = useSelector(state => state.userOrderItem)
    const { data: orderItem } = FetchOrderDetails(userOrderItem?.id)
    return (
        <div className="w-full">
            {
                orderItem?.orderItems?.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden  border object-cover">
                            <Image src={item?.item?.imageUrl} style={'!object-cover'} />
                        </div>
                        <span className="text-gray-600">{item?.item?.name}</span>
                        <span className="font-bold">{euro}{item?.item?.price}</span>
                        <span className="text-orange-500">
                            x{item?.quantity}
                        </span>
                    </div>

                ))
            }
            <div className="my-4 w-full border-t flex">
            </div>
            <div className="flex justify-between">
            <div>
                <p className=" font-semibold ">Total Amount: <span className="">{euro}{orderItem?.amount}</span></p>
                <p className=" font-semibold mt-2">Status: <span className={`text-sm ${orderItem?.status == "PENDING" ? 'text-orange-500' : orderItem?.status == "ACCEPTED" || orderItem?.status == "SHIPPED" ? "text-green-700" : "text-red-700"}`}>{orderItem?.status}</span></p>
            </div>    
         <div >
            <button onClick={()=> setUserOrderView("CANCEL")}  disabled={orderItem?.status != "PENDING"} className={`px-3 border flex gap-2 items-center font-semibold border-gray-400 text-[0.6rem] p-2 ${
                orderItem?.status != "PENDING" && 'border-gray-300 text-gray-300'
            }`}>
              CANCEL ORDER  <MdRemoveShoppingCart className="text-base"/> 
            </button>
         </div>
            </div>
               </div>
    )
}

export default OrderItem