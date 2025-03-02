/* eslint-disable react/prop-types */
import { IoMenu } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

export const Header = ({setNavIsOpen}) => {
  return (
    <div className='h-16 flex md:px-16 justify-between items-center p-4 w-full border-b shadow-gray-300'>
      <h1 className="font-logo font-semibold text-[1.3rem] text-red-700">Dami Cooks</h1>
     <ul className="hidden md:flex gap-8 text-gray-500 items-center">
      <li>Menu</li>
      <li>Services</li>
      <li>About Us</li>
      <li>Contact Us</li>
     </ul>
      <div className="flex gap-2">
        <IoNotificationsOutline className="text-3xl"/>
        <div className="text-2xl md:text-3xl"><IoCartOutline /></div>
        <button onClick={()=> setNavIsOpen(true)} className="text-2xl md:hidden"><IoMenu /></button>
      </div>
    </div>
  )
}
