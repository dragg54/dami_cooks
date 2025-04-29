import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
    const user = useSelector(state => state.user)
  if (!user) return <Navigate to="/login" replace />;
  return user.user.isAdmin ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />;
};

export default HomeRedirect;
