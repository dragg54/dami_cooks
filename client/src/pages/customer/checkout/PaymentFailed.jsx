/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button";

const PaymentFailed = () => {
    const navigate = useNavigate()
    return (
        <div className="mx-auto p-5 w-[500px]">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-8 rounded-full "><MdOutlineErrorOutline className="text-[4rem] text-red-500" /></div>
            <p className="text-lg">Sorry! Something happened and payment wasn't completed. Try again later.</p>
            <Button className={'mt-8 !rounded-full'} onClick={() => navigate("/")}>Go Back</Button>
        </div>
    )
}

export default PaymentFailed