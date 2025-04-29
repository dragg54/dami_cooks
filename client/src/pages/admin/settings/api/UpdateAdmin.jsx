import { useDispatch } from "react-redux"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"
import { closeModal } from "../../../../redux/GlobalModalSlice"
import { openPopup } from "../../../../redux/PopupSlice"

const UpdateAdmin = (id) => {
    const dispatch = useDispatch()
    const onSuccess = () => {
        dispatch(closeModal())
        dispatch(openPopup({message: "Admin updated" }))
    }
    const onError = (err) =>{
        console.log(err)
    }
    return useUpdateData({onSuccess, onError, url:`/users/${id}`})
}

export default UpdateAdmin