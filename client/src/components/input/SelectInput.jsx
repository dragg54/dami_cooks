/* eslint-disable react/prop-types */
import { ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa";


const SelectInput = ({ options, selectedValues, onChange, label, name, isMultiple, setSelectedValues }) => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="w-full text-sm md:text-base">
            <p className="mb-2">{label}</p>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full border border-gray-400 px-2 md:px-4 py-2 bg-white rounded shadow text-xs md:text-base text-gray-400 flex justify-between items-center"
            >
                {isMultiple ? label : ((selectedValues && selectedValues[name]?.label) || "Select an option")}
                <span><FaAngleDown /></span>
            </button>
         <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
        
            {isMultiple ? 
             <MultipleSelectOptions {...{ open, options, setOpen, onChange, selectedValues, setSelectedValues, name }}/> :
            <SelectOptions {...{ open, options, setOpen, onChange, selectedValues, name }} />}
        </div>
    )
}

const SelectOptions = ({ open, options, setOpen, onChange, selectedValues, name }) => {
    console.log(selectedValues)
    return (
        <>
            {open && (
                <ul className="absolute min-w-[150px] mt-1 bg-white z-40 border text-gray-500 rounded shadow" >
                    {options?.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                console.log(selectedValues)
                                onChange((prev) => ({...prev, [name]: {label: option.label, value: option.value}}));
                                setOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-300  "
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

const MultipleSelectOptions = ({ open, options, setOpen, onChange, selectedValues, name, setSelectedValues }) => {
    const handleChange = (e) => {
        if (selectedValues[name].includes(e.target.value)) {
            setSelectedValues({ ...selectedValues, [name]: selectedValues[name].filter(val => val != e.target.value) })
        }
        else {
            setSelectedValues({ ...selectedValues, [name]: [...selectedValues[name], e.target.value] })
        }
    }
    return (
        <>
        {open && (
                <ul onClick={(e)=> e.stopPropagation()} className="absolute min-w-[300px] bg-white mt-1
                  z-40 border max-h-[200px] overflow-scroll rounded shadow-md shadow-gray-300">
            {options && options.length > 0 && options.map((option) => (
                <li
                    key={option.value}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-300  list-none"
                >
                    <span className="w-full text-gray-500 items-center flex justify-start gap-x-6 ">
                        <input checked={selectedValues[name]?.includes(option.value.toString())} className="appearance-none  border border-gray-600 hover:cursor-pointer w-5 h-5 rounded bg-white checked:bg-gray-400" 
                        onChange={(e) => handleChange(e)} value={option.value} type="checkbox" />
                        <span>{option.label}</span>
                    </span>
                </li>
            ))}
            </ul>)}
        </>
    )
}

export default SelectInput