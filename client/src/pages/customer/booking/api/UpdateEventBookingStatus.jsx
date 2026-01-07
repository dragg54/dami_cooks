import { useQueryClient } from "react-query"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"
import { usePatchData } from "@/hooks/api/usePatchData"
import { useDispatch } from "react-redux"
import BookingQuotationDeclined from "../BookingQuotationDeclined"
import { openModal } from "@/redux/GlobalModalSlice"
import { useNavigate } from "react-router-dom"
import PaymentSection from "../PaymentSection"

export const UpdateEventBookingStatus = ({setResponseStatus, id, status, booking, bookingItems}) => {
   const navigate = useNavigate()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const onSuccess = (res) => {
        queryClient.invalidateQueries('eventBookings')
        if(status == "quotation_declined"){
             dispatch(openModal({component: <BookingQuotationDeclined />}))
        }
        else{
            navigate("/booking/payment", {state:{booking, bookingItems}})
        }
        setResponseStatus(res.status)
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return usePatchData({
        onSuccess, onError, url: `/eventBookings/${id}/status`
    })
}