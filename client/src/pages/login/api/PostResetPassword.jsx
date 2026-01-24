import { usePostData } from '@/hooks/api/usePostData'
import { openPopup } from '@/redux/PopupSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const PostResetPassword = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const onSuccess = () => {
            // dispatch(openModal({component: <UpdateOrderStatusResponse status={status}/>}))
            dispatch(openPopup({message: "Password reset successful"}))
            navigate("/login")
        }
    
        const onError = (error) => {
            console.log(error)
        }

        return usePostData({
            onSuccess, onError, url: `/users/resetPassword`
        })
}
