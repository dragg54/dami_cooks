/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { IoMenu } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllData } from "../../hooks/api/useFetchAllData";
import { fetchToCart } from "../../redux/CartSlice";
import { useEffect, useState } from "react";
import { useIgnoreMatchedPath } from "../../hooks/useIgnoreMatchedRoute";
import { useNavigate } from "react-router-dom";
import { getScreenSize } from "../../utils/getScreenSize";
import { usePostData } from "../../hooks/api/usePostData";
import { FaUser } from "react-icons/fa";
import { clearUser } from "../../redux/UserSlice";

export const Header = ({ setNavIsOpen, setCartOpen, setUserAccountOpen, setOpenLogout}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const { data, isLoading, refetch } = useFetchAllData("/cartItems", {enabled: user?.isLoggedIn})
  const cartItemMutation = usePostData({url:"/cartItems", onSuccess})
  const cart = useSelector(state => state.cart)
  const [currentMenu, setCurrentMenu] = useState("Menu")

  function onSuccess(){
    localStorage.removeItem("cartItems")
    refetch()
  }

  useEffect(() => {
    const localStorageItems = localStorage.getItem("cartItems")
    const parsedItems = JSON.parse(localStorageItems)
    if (parsedItems && parsedItems.length > 0 && user?.isLoggedIn) {
      cartItemMutation.mutate({cartItems: parsedItems})
    }
    dispatch(fetchToCart({ items: user?.isLoggedIn ? data : JSON.parse(localStorage.getItem("cartItems")) }))
  }, [data, isLoading, user])
  return (
    <div className='h-16 bg-white flex md:px-16 justify-between items-center p-4 w-full border-b shadow-gray-300'>
      <div className="md:w-[56px] w-[44px] h-[44px] object-cover border-red-600 md:h-[56px] overflow-hidden flex justify-center items-center"><img width={52} height={52} className=" " src="/images/LOGO.svg"/></div>
      {
        !user.user.isAdmin ? <ul className="hidden md:flex gap-8 text-gray-500 items-center">
          <li onClick={()=>{
            navigate("/")
            setCurrentMenu("Menu")
          }} className={`cursor-pointer ${currentMenu == "Menu" && 'text-orange-500'}`}>Menu</li>
          <li onClick={()=>{
            navigate("/about-us")
            setCurrentMenu("AboutUs")
          }}  className={`cursor-pointer ${currentMenu == "AboutUs" && 'text-orange-500'}`}>About Us</li>
          <li onClick={()=>{
            navigate("/services")
            setCurrentMenu("Services")
          }}  className={`cursor-pointer ${currentMenu == "Services" && 'text-orange-500'}`}>Services</li>
          <li  className={`cursor-pointer ${currentMenu == "ContactUs" && 'text-orange-500'}`} onClick={()=>{
            navigate("/contact-us")
            setCurrentMenu("ContactUs")
          }}>Contact Us</li>
        </ul>
        : 
        ( !useIgnoreMatchedPath() && user && user.user.isAdmin) ?
        <div className="flex items-center gap-3">
            <span className="text-[0.8rem] text-gray-500">Welcome Back, {user?.user?.firstName} {user?.user?.lastName}</span>
            <span onClick={()=> setOpenLogout(true)} className="rounded-full cursor-pointer border border-gray-500 p-2 text-gray-500 text-2xl">
              <FaUser />
            </span>
        </div>: ""
      }
      {
        useIgnoreMatchedPath() ? <div></div>: user.user && !user.user.isAdmin ? <div className="flex gap-2">
       { getScreenSize().isMobile ? <div></div>:!user.user? <span className="text-sm font-semibold h-full flex items-center">LOGIN</span>: <span onClick={()=> setUserAccountOpen(true)} className="text-[1.8rem] hover:cursor-pointer font-semibold h-full flex items-center"><FiUser /></span>}
          <button onClick={() => setCartOpen(true)} className="text-2xl md:text-3xl relative">
            <IoCartOutline /><span className={`absolute left-2 md:left-3 -top-2 md:-top-1 h-5 w-5 flex items-center 
              ${!cart || cart.cartItems.length < 1 && 'hidden'} justify-center rounded-full bg-red-700 text-white -right-1 text-xs`}>{cart?.cartItems?.length || ''}</span></button>
          <button onClick={() => setNavIsOpen(true)} className="text-2xl md:hidden"><IoMenu /></button>
          </div>: ""
      }
    </div>
  )
}
