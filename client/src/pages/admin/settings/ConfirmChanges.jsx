import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../components/button/Button"
import { closeModal } from "../../../redux/GlobalModalSlice"

/* eslint-disable react/no-unescaped-entities */
const ConfirmChanges = ({updateChanges}) => {
    console.log(updateChanges)
    const dispatch = useDispatch()
  return (
    <div onClick={(e)=> e.stopPropagation()} className="w-[400px] p-10 h-[250px] bg-white rounded-md shadow-md shadow-gray-500">
      <p className="text-gray-600">You are about to make changes to the admin setting. This may also affect your customer's experience on the application</p>
      <div className="flex gap-3 items-center mt-12 w-full justify-end">
        <Button type="button" onClick={()=> dispatch(closeModal())} className={'!rounded-full w-[100px] bg-white border-gray-700 !border !text-gray-500'}>
            Cancel
        </Button>
        <Button type="button" onClick={()=> {updateChanges()}} className={'!rounded-full w-[100px] bg-white border-gray-700 !border !text-gray-500'}>
            Confirm
        </Button>
      </div>
    </div>
  )
}

export default ConfirmChanges