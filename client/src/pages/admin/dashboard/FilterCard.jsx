import { MdOutlineCalendarMonth } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterCard = () => {
  return (
    <div className="w-[250px] text-gray-400 h-[50px] flex shadow-gray-400 p-3 justify-between items-center gap-2 bg-white rounded-md shadow-sm">
       <MdOutlineCalendarMonth className="text-3xl" />
       <div className="text-xs">
        <p className="font-semibold text-sm">Filter</p>
        <p>12 Jul 2025 - 31 Dec 2025</p>
       </div>
       <div>
        <RiArrowDropDownLine className="text-4xl"/>
       </div>
    </div>
  )
}

export default FilterCard