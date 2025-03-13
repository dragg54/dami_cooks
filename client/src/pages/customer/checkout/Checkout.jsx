import BillingDetails from "./BillingDetails"
import OrderSummary from "./OrderSummary"
import Payment from "./Payment"

const Checkout = () => {
  return (
    <div className="w-full flex flex-col md:flex-row px-4 md:px-0">
      <BillingDetails />
      <div className="md:w-1/2 w-full">
        <OrderSummary />
        <Payment />
      </div>
    </div>
  )
}

export default Checkout