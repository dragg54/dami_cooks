import { useDispatch } from "react-redux"
import { usePatchData } from "../../../../hooks/api/usePatchData"
import { openModal } from "../../../../redux/GlobalModalSlice"
import { useQueryClient } from "react-query"
import UpdateOrderStatusResponse from "../UpdateOrderStatusResponse"
import Spinner from "@/components/Spinner"
import UpdateOrderStatusFailed from "../UpdateOrderStatusFailed"

export const UpdateOrderStatus = (setResponseStatus, status) =>{
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
     const onSuccess = (res) => {
            dispatch(openModal({component: <UpdateOrderStatusResponse status={status}/>}))
            queryClient.invalidateQueries('orders')
            setResponseStatus(res)
        }
    
        const onError = (error) => {
             dispatch(openModal({component: <UpdateOrderStatusFailed status={status}/>}))
            console.log(error.response.data)
            setResponseStatus(error.response.data)
           
        }

        return usePatchData({
            onSuccess, onError, url: `/orders/id/status`
        })
}