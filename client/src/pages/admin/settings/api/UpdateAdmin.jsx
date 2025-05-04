import { useDispatch } from "react-redux"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"
import { closeModal } from "../../../../redux/GlobalModalSlice"
import { openPopup } from "../../../../redux/PopupSlice"
import { useQueryClient } from "react-query"

const UpdateAdmin = (id) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const onSuccess = () => {
        queryClient.invalidateQueries("adminSettings")
        queryClient.invalidateQueries("admin")
        dispatch(closeModal())
        dispatch(openPopup({message: "Admin updated" }))
    }
    const onError = (err) =>{
        console.log(err)
    }
    return useUpdateData({onSuccess, onError, url:`/users/${id}`})
}

export default UpdateAdmin