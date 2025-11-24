/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* esNavLinknt-disable react-hooks/rules-of-hooks */
/* esNavLinknt-disable react/prop-types */
import { IoMenu } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllData } from "../../hooks/api/useFetchAllData";
import { fetchToCart } from "../../redux/CartSlice";
import { useEffect, useState } from "react";
import { useIgnoreMatchedPath } from "../../hooks/useIgnoreMatchedRoute";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getScreenSize } from "../../utils/getScreenSize";
import { usePostData } from "../../hooks/api/usePostData";
import { FaSearch, FaUser } from "react-icons/fa";
import { FetchAdminSettings } from "../button/api/FetchAdminSettings";


export const Header = ({ setNavIsOpen, setCartOpen, setUserAccountOpen, setOpenLogout }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { data, isLoading, refetch } = useFetchAllData("/cartItems", { enabled: user?.isLoggedIn })
  const { data: settings, refetch: settingsRefresh, isLoading: settingsLoading } = FetchAdminSettings({})
  const cartItemMutation = usePostData({ url: "/cartItems", onSuccess })
  const cart = useSelector(state => state.cart)

  function onSuccess() {
    localStorage.removeItem("cartItems")
    refetch()
  }

  useEffect(() => {
    const localStorageItems = localStorage.getItem("cartItems")
    const parsedItems = JSON.parse(localStorageItems)
    if (parsedItems && parsedItems.length > 0 && user?.isLoggedIn) {
      cartItemMutation.mutate({ cartItems: parsedItems })
    }
    dispatch(fetchToCart({ items: user?.isLoggedIn ? data : JSON.parse(localStorage.getItem("cartItems")) }))
  }, [data, isLoading, user])
  return (
    <div className='h-16 bg-white flex md:px-16 justify-between items-center p-4 w-full border-b shadow-gray-300'>
      <div className="md:w-[56px] w-[44px] h-[44px]  object-cover border-red-600 md:h-[56px] overflow-hidden flex justify-center items-center">
<img
  src="/images/LOGO SVG.svg"
  alt=""
  className="w-24 h-auto text-red-500 fill-red-500"
/>        </div>
      {
        !user.user.isAdmin ? <nav className="hidden md:flex gap-8 text-gray-500 items-center">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              `cursor-pointer ${isActive && 'text-orange-500'}`}>Menu</NavLink>
          <NavLink to={'/about-us'}
            className={({ isActive }) => `cursor-pointer ${isActive && 'text-orange-500'}`}>About Us</NavLink>
          <NavLink to={'/services'} className={({ isActive }) => `cursor-pointer ${isActive && 'text-orange-500'}`}>Catering</NavLink>
          <NavLink to={"/contact-us"} className={({ isActive }) =>
            `cursor-pointer ${isActive && 'text-orange-500'}`}>Contact Us</NavLink>
        </nav>
          :
          (!useIgnoreMatchedPath() && user && user.user.isAdmin) ?
            <div className="flex items-center  gap-3 w-[90%] justify-between">
              <div className="ml-10 relative">
                <input type="text" className="border pr-8 rounded-md py-2 border-gray-400 bg-gray-200 px-2 text-sm w-[300px]" placeholder="Search items" />
                <div className="absolute inset-y-0 flex items-center cursor-pointer hover:text-gray-400 right-2 h-full">
                  <FaSearch />
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <div className="text-[0.8rem] text-gray-500 flex flex-col"><div>Welcome Back,</div> <span className="font-semibold text-lg text-gray-700">{user?.user?.firstName} {user?.user?.lastName}</span> </div>
                <div className="border h-10  border-gray-200 shdow-sm shadow-gray-300"></div>
               {(settings && settings.isOnline) ?  <p className="text-green-600 font-semibold">ON</p> :  <p className="text-red-600 font-semibold">OFF</p>}
                <span onClick={() => setOpenLogout(true)} className="rounded-full cursor-pointer border border-gray-400  p-2 text-gray-400 text-lg">
                  {(!user || !user.user || !user.isLoggedIn) ? <Link to={'/login'}>LOGIN</Link> : <FaUser />}
                </span>

              </div>   </div> : ""
      }
      {
        useIgnoreMatchedPath() ? <div></div> : user.user && !user.user.isAdmin ? <div className="flex gap-2 items-center">
          {getScreenSize().isMobile ? <div></div> : (!user.user || !user.isLoggedIn) ? <Link to={"/login"} className="text-sm font-semibold h-full flex items-center">LOGIN</Link> : <span onClick={() => setUserAccountOpen(true)} className="text-[1.8rem] hover:cursor-pointer font-semibold h-full flex items-center"><FiUser /></span>}
          <button onClick={() => setCartOpen(true)} className="text-2xl md:text-3xl relative">
            <IoCartOutline /><span className={`absolute left-2 md:left-3 -top-2 md:-top-1 h-5 w-5 flex items-center 
              ${!cart || cart.cartItems.length < 1 && 'hidden'} justify-center rounded-full bg-red-700 text-white -right-1 text-xs`}>{cart?.cartItems?.length || ''}</span></button>
          <button onClick={() => setNavIsOpen(true)} className="text-2xl md:hidden"><IoMenu /></button>
        </div> : ""
      }
    </div>
  )
}
