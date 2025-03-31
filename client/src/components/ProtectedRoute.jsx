/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
// import useAuthCheck from "../../hooks/useAuthCheck"
import {jwtDecode} from 'jwt-decode';
import NotFoundPage from "../pages/NotFoundPage";
import { clearUser } from "../redux/UserSlice";



const ProtectedRoute = ({isAdminRoute}) => {
    // useAuthCheck()
    const user = useSelector(state => state.user)?.user
    const authToken = useSelector(state => state.user).user?.token
    const dispatch = useDispatch()
    // const currentTime = Date.now() / 1000  
    // if(!authToken || (jwtDecode(authToken)?.exp < currentTime)){
    //     handleLogout(dispatch)
    // }
    if(isAdminRoute && !user.isAdmin){
       return<Navigate to="/not-found" /> 
    }
    if(!authToken || !user.isLoggedIn ){
       return  <Navigate to="/login" /> 
    }
    else{
        return <Outlet />
    }
}

const handleLogout = (dispatch) => {
    dispatch(clearUser())
    return <Navigate to="/login" />
};
export default ProtectedRoute