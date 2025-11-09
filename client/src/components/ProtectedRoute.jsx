/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { clearUser } from "../redux/UserSlice";



const ProtectedRoute = ({isAdminRoute}) => {
    // useAuthCheck()
    const user = useSelector(state => state.user)?.user
    const authToken = useSelector(state => state.user).token
    if(isAdminRoute && !user.isAdmin){
       return<Navigate to="/not-found" /> 
    }
    if(!authToken ){
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