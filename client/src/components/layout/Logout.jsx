/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";

const Logout = ({openLogout, setOpenLogout}) => {
  const logoutRef = useRef(null);

  const dispatch = useDispatch()
 const navigate = useNavigate()
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setOpenLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleLogout = () =>{
      dispatch(clearUser())
      navigate("/login")
   }
    if(openLogout)return (
        <div
          ref={logoutRef}
          onClick={()=>handleLogout()}
          className="p-4 border cursor-pointer shadow-md shadow-gray-500 absolute right-2 z-40 bg-white"
        >
          <p className="flex items-center gap-1 cursor-pointer">
            <MdLogout /> Logout
          </p>
        </div>
      )}

export default Logout;
