import { useEffect, useRef, useState } from "react";
import { FetchItems } from "./api/fetchItems";
import { useDispatch, useSelector } from "react-redux";
import ItemImage from "../../../components/Item/ItemImage";
import { euro } from '../../../constants/Currency'
import { changeSearchQuery } from "../../../redux/GlobalSearchItemSlice";
const SearchItem = () => {
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const searchRef = useRef(null)
      useEffect(() => {
        function handleClickOutside(event) {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsSearchOpen(false);
          }
        }
        // Attach event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    const dispatch = useDispatch()
    let searchQuery = useSelector(state => state.globalSearch).searchQuery
    const {data:itemData} = FetchItems({ filters: { searchText: debouncedQuery, enabled: searchQuery?.length > 0 } }, 'searchItems')
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedQuery?.trim() === "") {
            return;
        }
    }, [debouncedQuery]);
    useEffect(()=>{
        dispatch(changeSearchQuery(""))
    },[])

   useEffect(()=>{
    if(itemData && itemData.rows && itemData.rows.length > 0){
        setIsSearchOpen(true)
    }
    else{
        setIsSearchOpen(false)
    }
   }, [itemData])

    return (
        <div ref={searchRef} className={`w-[300px] ${(!isSearchOpen) && 'hidden'} z-40 overflow-y-scroll  rounded-md max-h-[400px] bg-white last:border-none shadow-md shadow-gray-400 absolute p-4 right-3 -top-8`}>
            <h1 className="text-gray-500 pt-5 text-lg">Search Results</h1>
            {
                itemData && itemData.rows?.length > 0 && itemData.rows.map((item) => (
                    <div key={item.id} className="w-full last:border-none h-[100px] gap-1 border-b border-gray-300 py-4 px-3 flex items-center justify-between">
                        <div className="h-16 w-16">
                            <ItemImage item={item} style={'bg-red-500 rounded-full !h-full !w-full flex justify-center items-center'} />
                        </div>
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-orange-500 text-lg">{euro}{item.price}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchItem