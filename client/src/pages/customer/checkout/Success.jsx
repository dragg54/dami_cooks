import { MdOutlineDone } from "react-icons/md";
import { Button } from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate()
  return (
    <div className="h-[370px] md:h-[400px] w-[90%] mt-4 md:w-1/2 mx-auto bg-white flex flex-col items-center p-10">
        <div className="p-4 rounded-full bg-primary"><MdOutlineDone className="text-[7rem] text-white"/></div>
        <p className="mt-4 text-gray-500 text-center">Checkout successful! A confirmation message will be sent to your email.</p>
        <Button onClick={()=> navigate("/")} className={'mt-12 w-full md:py-3'}>Continue Shopping</Button>
    </div>
  )
}

export default Success