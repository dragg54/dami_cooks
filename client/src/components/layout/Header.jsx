/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { IoMenu } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllData } from "../../hooks/useFetchAllData";
import { fetchToCart } from "../../redux/CartSlice";
import { useEffect } from "react";
import { useIgnoreMatchedPath } from "../../hooks/useIgnoreMatchedRoute";

export const Header = ({ setNavIsOpen, setCartOpen }) => {
  const { data, isLoading, isError } = useFetchAllData("/cartItems")
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  useEffect(() => {
    dispatch(fetchToCart({ items: data }))
  }, [data, isLoading])
  return (
    <div className='h-16 bg-white flex md:px-16 justify-between items-center p-4 w-full border-b shadow-gray-300'>
      <h1 className="font-logo font-semibold text-[1.3rem] text-red-700">Dami Cooks</h1>
      {
        !user.user.isAdmin ? <ul className="hidden md:flex gap-8 text-gray-500 items-center">
          <li>Menu</li>
          <li>Services</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
        : <span className="text-[1.2rem] text-gray-500">Welcome Back, {user?.user?.firstName} {user?.user?.lastName}</span>
      }
      {
        !user.user || useIgnoreMatchedPath() ? <div></div>: user.user && !user.user.isAdmin ? <div className="flex gap-2">
          <IoNotificationsOutline className="text-2xl md:text-3xl" />
          <button onClick={() => setCartOpen(true)} className="text-2xl md:text-3xl relative">
            <IoCartOutline /><span className={`absolute left-2 md:left-3 -top-2 md:-top-1 h-5 w-5 flex items-center 
              ${!cart || cart.cartItems.length < 1 && 'hidden'} justify-center rounded-full bg-red-700 text-white -right-1 text-xs`}>{cart?.cartItems?.length || ''}</span></button>
          <button onClick={() => setNavIsOpen(true)} className="text-2xl md:hidden"><IoMenu /></button>
          </div>: ""
      }
    </div>
  )
}
