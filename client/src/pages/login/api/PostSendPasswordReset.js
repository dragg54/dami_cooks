import { usePostData } from '@/hooks/api/usePostData'
import { useNavigate } from 'react-router-dom'

export const PostSendPasswordReset = () => {
     const navigate = useNavigate()
     const onSuccess = () => {
            // dispatch(openModal({component: <UpdateOrderStatusResponse status={status}/>}))
            navigate("/send-password-reset-link-success")
        }
    
        const onError = (error) => {
            console.log(error)
        }

        return usePostData({
            onSuccess, onError, url: `/users/sendResetPasswordLink`
        })
}
