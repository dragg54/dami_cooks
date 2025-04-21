import { useDispatch } from "react-redux"
import { usePatchData } from "../../../../hooks/api/usePatchData"
import { useQueryClient } from "react-query"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"

export const UpdateNotificationStatus = () =>{
    const queryClient = useQueryClient()
     const onSuccess = () => {
            queryClient.invalidateQueries('orders')
        }
    
        const onError = (error) => {
            console.log(error)
        }

        return useUpdateData({
            onSuccess, onError, url: `/notifications`
        })
}