import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { changeSearchQuery } from "../../redux/GlobalSearchItemSlice";

const Search = () => {
    const dispatch = useDispatch()
  
    return (
        <div className="w-full md:h-[4.5rem] h-14 bg-secondary p-2  flex justify-center">
            <div className="w-full md:w-1/2 relative">
            <input onChange={(e)=> dispatch(changeSearchQuery(e.target.value))} placeholder="Find a meal" className="h-full pl-12 w-full  bg-white rounded-md " type="text" />
            <IoSearchOutline  className="text-red-700 text-3xl left-3 md:-translate-y-10  -translate-y-9 absolute"/>
            </div>
        </div>
    )
}

export default Search