import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/usePostData";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../redux/UserSlice";

export const PostLogin = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = (res) =>{
        if(res.data?.userDetails.isAdmin){
            dispatch(fetchUser({user: res.data?.userDetails, token: res.data?.token}))
            navigate("/dashboard")
        }
        else{
            dispatch(fetchUser({user: res.data?.userDetails, token: res.data?.token}))
            navigate("/")
        }
    }

    const onError = (error) =>{
        console.log(error)
    }
    return usePostData({onSuccess, onError, url: "/users/login"})
}