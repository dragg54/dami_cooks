import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"

const UnauthenticatedCheckout = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full mb-32 p-4">
      <h1 className="mt-20 text-5xl">Sorry</h1>
      <p className="mt-4 text-xl">You must be logged in to checkout</p>
     <div className="flex gap-3 mt-6">
      <Button onClick={()=> navigate(-1)} className={'md:!w-[140px] w-[60px] font-semibold bg-transparent border !border-red-700 !text-red-700'}>
        Back
      </Button>
     <Button onClick={()=> navigate("/login")} className={'md:!w-[140px] w-[60px] font-semibold  bg-transparent border !border-red-700 !text-red-700'}>
        Login
      </Button>
     </div>
    </div>
  )
}

export default UnauthenticatedCheckout