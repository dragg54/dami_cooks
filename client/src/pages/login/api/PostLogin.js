import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";
import { useDispatch } from "react-redux";
import { clearUser, fetchUser } from "../../../redux/UserSlice";
import { openPopup } from "../../../redux/PopupSlice";

export const PostLogin = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = (res) =>{
        dispatch(clearUser())
        if(res.data && res.data.userDetails.isAdmin){
            dispatch(fetchUser({user: res.data?.userDetails, token: res.data?.token}))
            navigate("/dashboard")
        }
        else if(res.data && !res.data.userDetails.isAdmin){
            dispatch(fetchUser({user: res.data?.userDetails, token: res.data?.token}))
            navigate("/")
        }
        else{
            return
        }
        dispatch(openPopup({message: "Login successful"}))
    }

    const onError = (error) =>{
        console.log(error)
    }
    return usePostData({onSuccess, onError, url: "/users/login"})
}