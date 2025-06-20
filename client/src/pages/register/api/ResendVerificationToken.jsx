import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";

export const ResendVerificationToken = () =>{
    const navigate = useNavigate()
    const onSuccess = () =>{
            console.log("Verification token resent")
        }

    const onError = (error) =>{
        console.log(error)
    }
    return usePostData({onSuccess, onError, url: "/users/tokenVerification/resend"})
}