/* eslint-disable react/prop-types */
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({className, placeholder}) => {
  return (
    <div className='relative w-full h-full'>
        <input placeholder={placeholder || "Search"} type="text" className={`${className} w-full h-full p-3 rounded-full border border-gray-300`}/>
        <IoSearchOutline className="absolute right-2 translate-y-1/2 text-3xl text-gray-400 -top-1/4"/>
    </div>
  )
}

export default SearchInput