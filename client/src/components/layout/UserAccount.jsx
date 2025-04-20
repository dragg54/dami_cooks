/* eslint-disable react/prop-types */
import { IoLogOutOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { useEffect, useRef } from "react";


const UserAccount = ({userAccountOpen, setUserAccountOpen, setUserOrdersOpened}) => {
    const modalRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setUserAccountOpen(false)
          }
        };
    
        if (userAccountOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [userAccountOpen]);
    
      if (!userAccountOpen) return null;
  return (
    <div ref={modalRef} className={`w-[250px] ${!userAccountOpen && 'hidden'} h-[160px] bg-white rounded-md shadow-lg shadow-gray-700 absolute right-1 z-40 p-4 mt-1`}>
          {userAccountOpen && (
        <div
          onClick={() => setUserAccountOpen(false)}
        />
      )}
     <p className="font-bold text-xl w-full pb-3 border-b">SADIQ AJIBOLA</p>
     <ul className="text-xl mt-3 flex flex-col gap-3">
        <li className="w-full hover:bg-orange-200 text-gray-500" onClick={()=> setUserOrdersOpened(true)}>
            <span className="px-2 absolute pl-4 py-2 hover:bg-orange-200 hover:cursor-pointer w-full left-0 flex items-center gap-2 "><FaList className="text-sm"/> My Orders</span></li>
        <li className="text-orange-500 mt-2"><span className="absolute py-2 pb-3  cursor-pointer hover:bg-orange-200 pl-4 w-full left-0  flex px-2 mt-6 items-center  gap-2"><IoLogOutOutline /> Logout</span></li>
     </ul>
    </div>
  )
}

export default UserAccount