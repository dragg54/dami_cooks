import { useEffect, useState } from "react"
import BillingDetails from "./BillingDetails"
import OrderSummary from "./OrderSummary"
import Payment from "./Payment"
import { useSelector } from "react-redux"
import { usePostData } from "../../../hooks/usePostData"
import Spinner from "../../../components/Spinner"

const Checkout = () => {
  const user = useSelector(state => state.user)
  const initialValues = {
    firstName: user?.user?.firstName,
    lastName: user?.user?.lastName,
    email: user?.user?.email,
    address: user?.user?.address
  }
  const cart = useSelector(state => state.cart)
  const [clientSecret, setClientSecret] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState()
  const onSuccess = (data) => {
    setClientSecret(data.data.clientSecret)
  }

  const onError = (err) => {
    console.log(err.message)
  }

  const { mutate, isLoading } = usePostData({ onSuccess, onError, url: '/payments' })


  useEffect(() => {
    setDeliveryDetails(initialValues)
  }, [user])

  useEffect(() => {
    const cartItems = cart.cartItems?.map(cartItem => (
      { ...cartItem.item, quantity: cartItem.quantity }
    ))
    mutate({ items: cartItems })
  }, [cart, cart?.cartItems])

  if(isLoading || !clientSecret){
    console.log("eeeee")
    return <div className="w-full h-screen -mt-40 flex items-center justify-center">
      <Spinner style={'!h-12 !w-12'} isLoading={isLoading}/>
    </div>
  }
  return (
    <div className="w-full flex flex-col md:flex-row px-4 md:px-0">
      <BillingDetails {...{ deliveryDetails, setDeliveryDetails }} />
      <div className="md:w-1/2 w-full">
        <OrderSummary />
        <Payment {...{ deliveryDetails, clientSecret }} />
      </div>
    </div>
  )
}

export default Checkout