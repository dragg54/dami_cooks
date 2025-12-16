/* eslint-disable react/prop-types */
import { getScreenSize } from "@/utils/getScreenSize"
import { GoHome } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoBagOutline } from "react-icons/io5";




const MobileNavigation = ({setCartOpen, setNavIsOpen}) => {
      const cart = useSelector(state => state.cart)
    
 if(getScreenSize().isMobile){
    return(
        <nav className="w-full z-50 h-16 px-8 flex items-center justify-between bg-white border shadow-lg shadow-gray-500 sticky bottom-0">
         <NavLink to={'/home'} className="flex flex-col gap-1 justify-center items-center">
             <GoHome className="text-2xl"/>
             <span className="text-xs text-gray-500">Home</span>
         </NavLink>
       <div className="flex flex-col gap-1 justify-center items-center">
          <button onClick={() => setCartOpen(true)} className="text-2xl md:text-3xl relative">
                    <BsCart3 /><span className={`absolute left-2 md:left-3 -top-2 md:-top-1 h-5 w-5 flex items-center 
                      ${!cart || cart.cartItems.length < 1 && 'hidden'} justify-center rounded-full bg-red-700 text-white -right-1 text-xs`}>{cart?.cartItems?.length || ''}</span></button>
            <span className="text-xs text-gray-500">Cart</span>
       </div>
         <NavLink to="/customer/orders" className="flex flex-col gap-1 justify-center items-center">
            <IoBagOutline  className="text-2xl"/>
            <span className="text-xs text-gray-500">Orders</span>
         </NavLink>
        </nav>
    )
 }
}

export default MobileNavigation