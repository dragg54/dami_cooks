import { MdOutlineDone } from "react-icons/md";
import { Button } from "../../../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom"
import { UpdateUser } from "./api/UpdateUser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Success = () => {
  const user = useSelector(state => state.user)
  const [responseStatus, setResponseStatus] = useState()
  const { mutate } = UpdateUser({ setResponseStatus, id: user.user.id })

  const location = useLocation()
  const deliveryDetails = location.state?.deliveryDetails

  useEffect(() => {
    if (deliveryDetails) {
      mutate({
        address: deliveryDetails?.address.line1,
        town: deliveryDetails?.address.town,
        city: deliveryDetails?.address.city,
        phone: deliveryDetails?.phone,
        state: deliveryDetails?.address.state,
        postalCode: deliveryDetails?.address.postal_code
      })
    }
  }, [])
  const navigate = useNavigate()
  return (
    <div className="h-[370px] md:h-[400px] w-[90%] mt-4 md:w-1/2 mx-auto bg-white flex flex-col items-center p-10">
      <div className="p-4 rounded-full bg-primary"><MdOutlineDone className="text-[7rem] text-white" /></div>
      <p className="mt-4 text-gray-500 text-center">Checkout successful! A confirmation message will be sent to your email.</p>
      <Button onClick={() => navigate("/")} className={'mt-12 w-full md:py-3'}>Continue Shopping</Button>
    </div>
  )
}

export default Success