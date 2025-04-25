import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/api/usePostData";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../redux/UserSlice";
import { openPopup } from "../../../redux/PopupSlice";

export const PostUser = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSuccess = () =>{
            navigate("/login")
            dispatch(openPopup({message: "User registration successful"}))
        }

    const onError = (error) =>{
        console.log(error)
    }
    return usePostData({onSuccess, onError, url: "/users"})
}