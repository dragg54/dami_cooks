import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/PopupSlice";

export const ResendVerificationToken = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = () =>{
            dispatch(openPopup({message: "Email verification sent"}))
        }

    const onError = (error) =>{
        console.log(error)
    }
    return usePostData({onSuccess, onError, url: "/users/tokenVerification/resend"})
}