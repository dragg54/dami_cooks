/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import Image from "../../../components/image/Image"
import { Euro } from "../../../constants/Currency"

const OrderSummary = ({ shippingChargeResponse, shippingChargeLoading, deliveryDetails }) => {
    const cartItems = useSelector(state => state.cart)?.cartItems

     const cartTotal = cartItems?.reduce((total, cartItem) => {
    const price = Number(cartItem?.item?.price || 0);
    const quantity = Number(cartItem?.quantity || 0);
    return total + price * quantity;
  }, 0);    return (
        <div className="w-full mt-10 h-auto md:mb-10 mb-5 md:mr-8 border border-gray-300 
                         shadow-md shadow-gray-300 rounded-md md:p-6 p-4 bg-white">
            <h1 className=" font-semibold text-2xl my-4">Cart History</h1>
            <ul className="first: border-t border-gray-300">
                {
                    cartItems?.map((cartItem) => (
                        <li key={cartItem.id} className="inline-flex items-center border-b py-3 border-gray-300 justify-between w-full text-sm text-gray-400">
                            <span className="flex gap-2 items-center"><Image style={'!h-16 !w-16'} src={cartItem?.item.imageUrl} />{cartItem?.item.name} <span className="text-[#fdb750]">x {cartItem?.quantity}</span></span>

                            <span className=""><Euro />{cartItem?.item.price}</span></li>
                    ))
                }
            </ul>
            <div>
                <div className="flex justify-between text-gray-600">
                    <span className="">Shipping Charge</span>
                    <span>
                        {deliveryDetails?.deliveryMethod == "delivery"  && shippingChargeLoading && "Calculating…"}
                        {deliveryDetails?.deliveryMethod == "delivery" && !shippingChargeLoading && shippingChargeResponse && (
                            <>
                                <Euro />{shippingChargeResponse?.amount_with_tax?.toFixed(2) || 0}
                            </>
                        )}
                        {(deliveryDetails?.deliveryMethod == "pickup" || (!shippingChargeLoading && !shippingChargeResponse)) &&
                            <>
                                <Euro />0
                            </>}
                    </span>
                </div>
                <p className="text-lg font-semibold mt-4 flex gap-4 items-center"><span>Total</span><span><Euro />{cartTotal + Number(shippingChargeResponse?.amount_with_tax?.toFixed(2) || 0)}</span></p>

            </div>
        </div>
    )
}

export default OrderSummary