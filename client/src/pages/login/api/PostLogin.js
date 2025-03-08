import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/usePostData";

export const PostLogin = () =>{
    const navigate = useNavigate()
    const onSuccess = (res) =>{
        if(res.userDetails.isAdmin){
            navigate("/dashboard")
        }
    }

    const onError = (error) =>{
        console.log(error)
    }
    return usePostData({onSuccess, onError, url: "/users/login"})
}