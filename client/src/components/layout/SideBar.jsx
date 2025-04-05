
import { MdOutlineDashboard, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { useSelector } from "react-redux";


const SideBar = () => {
  const unreadNotification = useSelector(state => state.notification)?.unread  
  return (
    <div className="md:w-[240px] h-screen w-[50px] bg-white">
       <ul className="gap-10 w-full hidden md:flex flex-col mt-10 items-start ml-4 !text-gray-200 ">
        <li className="menus mt-12" ><MdOutlineDashboard /><Link className="menus" to="/dashboard">Dashboard</Link></li>
        <li className="menus"><MdOutlineInventory2 /><Link className="menus" to="/itemlist">Items</Link></li>
        <li className="menus relative"><FaBasketShopping /><Link className="menus" to="/orderlist">Orders 
         {unreadNotification >0 && <span className="h-6 w-6 flex items-center justify-center text-[0.5rem] text-white !rounded-full bg-green-400 absolute -right-6 -top-1 ">new</span>}
         </Link></li>
        <li className="menus"><MdOutlinePayments /><Link className="menus" to="/paymentlist">Payments</Link></li>
        <li className="menus"><MdSettings /><Link className="menus" to="/settings">Settings</Link></li>
        {/* <li className="menus" ><MdOutlinePayment /><Link className="menus" to="/donation">Donation</Link></li> */}
     </ul>
    </div>
  )
}

export default SideBar