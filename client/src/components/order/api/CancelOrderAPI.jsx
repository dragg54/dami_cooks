import { useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { usePatchData } from '../../../hooks/api/usePatchData'
import { clearUserOrderItem } from '../../../redux/UserOrderItem'

export const CancelOrderAPI = (setUserOrderView) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
     const onSuccess = () => {
            // dispatch(openModal({component: <UpdateOrderStatusResponse status={status}/>}))
            queryClient.invalidateQueries('userOrders')
            dispatch(clearUserOrderItem())
            setUserOrderView("CANCELLED")
        }
    
        const onError = (error) => {
            console.log(error)
          setUserOrderView("CANCELFAILED")           
        }

        return usePatchData({
            onSuccess, onError, url: `/orders/id/cancellation`
        })
}
