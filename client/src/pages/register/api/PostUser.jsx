import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/GlobalModalSlice";
import { openPopup } from "@/redux/PopupSlice";

export const PostUser = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = (res, variables) =>{
            navigate("/verify-email", {state: {email:variables.email}})
        }

    const onError = (error) =>{
       if(error.status == 409){
        dispatch(openPopup({message: "User already exists", success: false}))
       }
    }
    return usePostData({onSuccess, onError, url: "/users"})
}