import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";
import { useDispatch } from "react-redux";
import { clearUser, fetchUser } from "../../../redux/UserSlice";
import { openPopup } from "../../../redux/PopupSlice";
import { ref } from "yup";

export const PostLogin = (email) =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = (res, variables) =>{
        dispatch(clearUser())
        if(res.data && !res.data.userDetails.isVerifiedEmail){
             dispatch(fetchUser({user: res.data?.userDetails, isVerifiedEmail: false, token: res.data?.token, refreshToken: res.data?.refreshToken}))
            navigate("/verify-email", {state:{email: variables.email}})
            return
        }
        if(res.data && res.data.userDetails.isAdmin){
            dispatch(fetchUser({user: res.data?.userDetails, isVerifiedEmail: true, token: res.data?.token, refreshToken: res.data?.refreshToken}))
            navigate("/dashboard")
            return
        }
        else if(res.data && !res.data.userDetails.isAdmin){
            dispatch(fetchUser({user: res.data?.userDetails, token: res.data?.token, refreshToken: res.data?.refreshToken}))
            navigate("/")
            return
        }
        else{
            return
        }
    }

    const onError = (error) =>{
        if(error.status == 400){
            dispatch(openPopup({message: "Invalid user of password", success: false}))
        }
    }
    return usePostData({onSuccess, onError, url: "/users/login"})
}