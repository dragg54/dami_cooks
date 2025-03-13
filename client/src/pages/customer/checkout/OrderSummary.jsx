import { useSelector } from "react-redux"
import Image from "../../../components/image/Image"
import { euro } from "../../../constants/Currency"

const OrderSummary = () => {
    const cartItems = useSelector(state => state.cart)?.cartItems
    return (
        <div className="w-full mt-10 h-auto md:mb-10 mb-5 md:mr-8 border border-gray-300 
                         shadow-md shadow-gray-300 rounded-md md:p-6 p-4">
            <h1 className=" font-semibold text-2xl my-4">Cart History</h1>
            <ul className="first: border-t border-gray-300">
                {
                    cartItems?.map((cartItem) => (
                        <li key={cartItem.id} className="inline-flex items-center border-b py-3 border-gray-300 justify-between w-full text-sm text-gray-400">
                            <span className="flex gap-2 items-center"><Image style={'!h-16 !w-16'} src={cartItem?.item.imageUrl} />{cartItem?.item.name} <span className="text-[#fdb750]">x {cartItem?.quantity}</span></span>
                        
                            <span className="">{euro}{cartItem?.item.price}</span></li>
                    ))
                }
            </ul>
            <div>
                <p className="text-lg font-semibold mt-4"><span>Total</span> <span>{euro}10.00</span></p>
            </div>
        </div>
    )
}

export default OrderSummary