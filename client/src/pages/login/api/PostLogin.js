import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";
import { useDispatch } from "react-redux";
import { clearUser, fetchUser } from "../../../redux/UserSlice";
import { openPopup } from "../../../redux/PopupSlice";

export const PostLogin = (email) =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = (res, variables) =>{
        dispatch(clearUser())
        if(res.data && !res.data.userDetails.isVerifiedEmail){
            console.log("yesss")
             dispatch(fetchUser({user: res.data?.userDetails, isVerifiedEmail: false, token: res.data?.token}))
            navigate("/verify-email", {state:{email: variables.email}})
            return
        }
        if(res.data && res.data.userDetails.isAdmin){
            dispatch(fetchUser({user: res.data?.userDetails, isVerifiedEmail: true, token: res.data?.token}))
            navigate("/dashboard")
            return
        }
        else if(res.data && !res.data.userDetails.isAdmin){
            dispatch(fetchUser({user: res.data?.userDetails, token: res.data?.token}))
            navigate("/")
            return
        }
        else{
            return
        }
        dispatch(openPopup({message: "Login successful"}))
    }

    const onError = (error) =>{
        if(error.status == 400){
            dispatch(openPopup({message: "Invalid user of password", success: false}))
        }
    }
    return usePostData({onSuccess, onError, url: "/users/login"})
}