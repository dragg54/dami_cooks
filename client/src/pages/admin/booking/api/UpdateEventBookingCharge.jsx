import { useQueryClient } from "react-query"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"

export const UpdateEventBookingCharge = ({setResponseStatus, id}) => {

    const queryClient = useQueryClient()

    const onSuccess = (res) => {
        queryClient.invalidateQueries('EventBookingCharges')
        setResponseStatus(res.status)
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return useUpdateData({
        onSuccess, onError, url: `/eventBookings/${id}/charges`
    })
}