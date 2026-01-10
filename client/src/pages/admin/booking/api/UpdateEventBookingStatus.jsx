import { useQueryClient } from "react-query"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"
import { usePatchData } from "@/hooks/api/usePatchData"
import { useDispatch } from "react-redux"
import { closeModal } from "@/redux/GlobalModalSlice"
import { openPopup } from "@/redux/PopupSlice"

export const UpdateEventBookingStatus = ({setResponseStatus, id}) => {

    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const onSuccess = (res) => {
        queryClient.invalidateQueries('EventBookings')
        dispatch(openPopup({message: "Booking successfully declined", success: true}))
        setResponseStatus(res.status)
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
        dispatch(openPopup({message: "Request not completed", success: false}))
    }
    return usePatchData({
        onSuccess, onError, url: `/eventBookings/${id}/status`
    })
}