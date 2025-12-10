import { useQueryClient } from "react-query"
import { usePostData } from "../../../../hooks/api/usePostData"
import { useDispatch } from "react-redux"
import { openModal } from "@/redux/GlobalModalSlice"
import BookingSuccessful from "../BookingSuccessful"

export const PostEventBooking = ({setResponseStatus}) => {
    const dispatch = useDispatch()
    const client = useQueryClient()
    const onSuccess = (res) => {
        client.invalidateQueries("eventBookings")
        setResponseStatus(res.status)
        dispatch(openModal({component: <BookingSuccessful />}))
    }
    
    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return usePostData({
        onSuccess, onError, url: "/eventBookings"
    })
}