import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/PopupSlice";

export const VerifyToken = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = () =>{
            navigate("/login")
            dispatch(openPopup({message: "Email verification successful", success: true}))
        }

    const onError = (error) =>{
        if(error.status == 400){
            dispatch(openPopup({message: "Invalid Token", success: false}))
        }
    }
    return usePostData({onSuccess, onError, url: "/users/tokenVerification"})
}