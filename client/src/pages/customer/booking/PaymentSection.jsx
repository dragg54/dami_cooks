import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { usePostData } from "../../../hooks/api/usePostData"
import Spinner from "../../../components/Spinner"
// import UnauthenticatedPaymentSection from "./UnauthenticatedPaymentSection"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import BookingDetails from "./BookingDetails"
import BookingPayment from "./BookingPayment"
import BookingItems from "./BookingItems"

const PaymentSection = () => {
  const user = useSelector(state => state.user)
  const [idempotencyKey] = useState(uuidv4)
  const state = useLocation().state
  const navigate = useNavigate()
  const [clientSecret, setClientSecret] = useState("");
  const onSuccess = (data) => {
    setClientSecret(data.data.clientSecret)
  }
  const onError = () => {
    navigate("payment-intent-failed")
  }

  const { mutate, isLoading } = usePostData({ onSuccess, onError, url: '/payments' })



  useEffect(() => {
    if (user?.isLoggedIn) {

      mutate({ bookingId: state?.booking.id, idempotencyKey })
    }
  }, [state])

  //   if(!user || !user.user || !user?.isLoggedIn){
  //     return(
  //       <UnauthenticatedPaymentSection />
  //     )
  //   }

  if (isLoading && !clientSecret) {
    return <div className="w-full h-screen -mt-40 flex items-center justify-center">
      <Spinner style={'!h-12 !w-12'} isLoading={isLoading} />
    </div>
  }


  return (
    <div className="w-full flex flex-col  overflow-scroll p-3 md:p-6  mb-10 bg-white rounded-lg shadow-md shadow-gray-300">
      <BookingDetails {...{ bookingData: state?.booking }} />
      <BookingItems {...{bookingItems: state.bookingItems}} />
      <div className="w-full mt-4">
        <BookingPayment {...{ clientSecret, setClientSecret }} />
      </div>
    </div>
  )
}

export default PaymentSection