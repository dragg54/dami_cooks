/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button";

const UpdateOrderStatusFailed = ({status}) => {
    const navigate = useNavigate()
    return (
         <div className="mx-auto p-5 w-[500px] bg-white rounded-2xl shadow-md">
                    <div className="w-12 h-12 flex items-center justify-center mx-auto mb-8 rounded-full "><MdOutlineErrorOutline className="text-[4rem] text-red-500" /></div>
                    <p className="text-lg text-center">Something happened and order cannot be {status == 'CONFIRMED' ? 'confirmed' : status == "SHIP" ? 'shipped' : 'rejected'}. Try again later.</p>
                    <Button className={'mt-8 !py-3 !rounded-full'}>Go Back</Button>
                </div>
    )
}

export default UpdateOrderStatusFailed