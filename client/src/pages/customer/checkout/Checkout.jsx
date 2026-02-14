import { useEffect, useState } from "react"
import BillingDetails from "./BillingDetails"
import OrderSummary from "./OrderSummary"
import Payment from "./Payment"
import { useSelector } from "react-redux"
import { usePostData } from "../../../hooks/api/usePostData"
import Spinner from "../../../components/Spinner"
import UnauthenticatedCheckout from "./UnauthenticatedCheckout"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { GetShippingCharge } from "./api/CalculateShippingCharge"

const Checkout = () => {
  const user = useSelector(state => state.user)
  const [idempotencyKey] = useState(uuidv4)
  const [ shippingChargeResponse, setShippingChargeResponse ] = useState({})
  const { mutate: mutateShippingCharge, isError, isLoading: shippingChargeLoading } = GetShippingCharge({ setResponseStatus: setShippingChargeResponse })
  const navigate = useNavigate()
  const userDetails = {
    firstName: user?.user?.firstName,
    lastName: user?.user?.lastName,
    email: user?.user?.email,
    phone: user?.user?.phone,
    address: user?.user?.address,
    deliveryMethod: "pickup"
  }

  const cart = useSelector(state => state.cart)
  const [clientSecret, setClientSecret] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState()
  const onSuccess = (data) => {
    setClientSecret(data.data.clientSecret)
  }

  const onError =()=> {
     navigate("payment-intent-failed")
  }

  const { mutate, isLoading } = usePostData({ onSuccess, onError, url: '/payments' })


  useEffect(() => {
    setDeliveryDetails(userDetails)
  }, [user])

  useEffect(() => {
  if (!deliveryDetails?.address || deliveryDetails?.address.length < 5 || deliveryDetails?.deliveryMethod != "delivery") return;

  const timeout = setTimeout(() => {
    mutateShippingCharge({address: deliveryDetails.address});
  }, 600); 

  return () => clearTimeout(timeout);
}, [deliveryDetails?.address]);

useEffect(() => {
  if(deliveryDetails?.deliveryMethod == "delivery" && deliveryDetails?.address?.length > 1){
      mutateShippingCharge({address: deliveryDetails.address});
    }
}, [deliveryDetails?.deliveryMethod])

  useEffect(() => {
    const cartItems = cart.cartItems?.map(cartItem => (
      { ...cartItem.item, quantity: cartItem.quantity }
    ))
    if (user?.isLoggedIn) {
     
      mutate({ items: cartItems, idempotencyKey, shipping: (!deliveryDetails || deliveryDetails?.deliveryMethod == "pickup") ? null : shippingChargeResponse, deliveryMethod: deliveryDetails?.deliveryMethod || "pickup" })
    }
  }, [shippingChargeResponse, deliveryDetails?.deliveryMethod, deliveryDetails?.address])
 
  if(!user || !user.user || !user?.isLoggedIn){
    return(
      <UnauthenticatedCheckout />
    )
  }

  if(isLoading && !clientSecret){
    return <div className="w-full h-screen -mt-40 flex items-center justify-center">
      <Spinner style={'!h-12 !w-12'} isLoading={isLoading}/>
    </div>
  }
  

  return (
    <div className="w-full flex flex-col md:flex-row px-4 md:px-0 mb-20">
      <BillingDetails {...{ deliveryDetails, setDeliveryDetails }} />
      <div className="md:w-1/2 w-full">
        <OrderSummary {...{shippingChargeResponse, shippingChargeLoading, deliveryDetails}}/>
        <Payment {...{ deliveryDetails, clientSecret, setClientSecret, shippingChargeResponse }} />
      </div>
    </div>
  )
}

export default Checkout