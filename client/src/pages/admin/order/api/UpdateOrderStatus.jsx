import { useDispatch } from "react-redux"
import { usePatchData } from "../../../../hooks/api/usePatchData"
import { openModal } from "../../../../redux/GlobalModalSlice"
import { useQueryClient } from "react-query"
import UpdateOrderStatusResponse from "../UpdateOrderStatusResponse"

export const UpdateOrderStatus = (setResponseStatus, status) =>{
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
     const onSuccess = () => {
            dispatch(openModal({component: <UpdateOrderStatusResponse status={status}/>}))
            queryClient.invalidateQueries('orders')
        }
    
        const onError = (error) => {
            setResponseStatus(error.response.status)
           
        }

        return usePatchData({
            onSuccess, onError, url: `/orders/id/status`
        })
}