/* eslint-disable react/prop-types */
import { GoPencil } from "react-icons/go";

const Filter = ({ filterRef, isFilterOpen, filterValues,toggleFilter, setFilterValues, handleEnterKey}) => {
    const filters = Object.entries(filterValues)

    const handleInputChange = (e) =>{
        // setFilterValues({[e.target.name]: { id: e.target.id, value: e.target.value }})
       setFilterValues({...filterValues, [e.target.name]: {id: e.target.id, value: e.target.value}})
    
}
    return (
        <div onClick={(e)=> e.stopPropagation()} ref={filterRef} className={`min-w-[400px] cursor-default w-full text-sm gap-y-4 text-gray-600 ${!isFilterOpen && 'hidden'}
         absolute p-4 border top-10 z-50 h-max-[300px] bg-white rounded-md shadow-md shadow-gray-400 grid grid-cols-2`}>
            <div className='border-b border-gray-200 pb-2 font-semibold'>
                <p>Search By</p>
            </div>
            <div className='w-full border-b border-gray-200 pb-2 font-semibold'>
                <p>Value</p>
            </div>
            {
                filters?.length > 0 && filters?.map((filter, index) => (
                    <div className="col-span-3 grid border-b border-gray-300 grid-cols-2" key={index}>
                        <div className=''>
                            <p>{filter[0]}</p>
                        </div>
                        <div className='relative'>
                            <input value={filter[1].value} onKeyDown={(e)=>{
                                handleEnterKey(e)
                                if(e.key == "Enter"){
                                    toggleFilter()
                                }
                            }} name={filter[0]} id={filter[1].id} 
                            onChange={(e)=>handleInputChange(e)} type='text' className='border-b border-gray-500 outline-none pl-4' />
                            <GoPencil className='absolute  left-0 h-full translate-y-1/2 -top-1/2' />
                        </div>
                    </div>

                ))
            }
            {/* <div className=''>
                <p>Customer Name</p>
            </div>
            <div className='relative'>
                <input type='text' className='border-b border-gray-300 outline-none pl-4' />
                <GoPencil className='absolute  left-0 h-full translate-y-1/2 -top-1/2' />
            </div>
            <div className=''>
                <p>Order type</p>
            </div>
            <div className='relative'>
                <input type='text' className='border-b border-gray-300 outline-none pl-4' />
                <GoPencil className='absolute  left-0 h-full translate-y-1/2 -top-1/2' />
            </div> */}
        </div>
    )
}

export default Filter