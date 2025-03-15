import { useEffect, useState } from "react"
import BillingDetails from "./BillingDetails"
import OrderSummary from "./OrderSummary"
import Payment from "./Payment"
import { useSelector } from "react-redux"

const Checkout = () => {
   const user = useSelector(state => state.user)
    const initialValues = {
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      email: user?.user?.email,
      address: user?.user?.address
    }
  

  const [deliveryDetails, setDeliveryDetails ] = useState()

  useEffect(()=>{
    setDeliveryDetails(initialValues)
  }, [user])


  return (
    <div className="w-full flex flex-col md:flex-row px-4 md:px-0">
      <BillingDetails {...{deliveryDetails, setDeliveryDetails}}/>
      <div className="md:w-1/2 w-full">
        <OrderSummary />
        <Payment {...{deliveryDetails}}/>
      </div>
    </div>
  )
}

export default Checkout