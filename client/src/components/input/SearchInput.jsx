/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({className, placeholder, debouncedQuery, setDebouncedQuery}) => {
  const [query, setQuery] = useState()
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); 

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery?.trim() === "") {
      // onSearchResults({ items: [], totalPages: 1, currentPage: 1 });
      return;
    }

  }, [debouncedQuery]);

  return (
    <div className='relative w-full h-full'>
        <input onChange={(e)=>setQuery(e.target.value)} placeholder={placeholder || "Search"} type="text" className={`${className} !text-xs p-1 w-full h-full md:p-3 rounded-full border border-gray-300`}/>
        <IoSearchOutline className="absolute right-2 -translate-y-1/2 text-2xl text-gray-400 top-1/2 h-full"/>
    </div>
  )
}

export default SearchInput