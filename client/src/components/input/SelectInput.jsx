/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa";


const SelectInput = ({ options, selectedValue, onChange, label }) => {
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
            <p>{label}</p>
            <button
                onClick={() => setOpen(!open)}
                className="w-full border px-2 md:px-4 py-2 bg-white rounded shadow text-xs md:text-base text-gray-400 flex justify-between items-center"
            >
                {selectedValue?.label || "Select an option"}
                <span><FaAngleDown /></span>
            </button>
            <SelectOptions {...{ open, options, setOpen, onChange }} />
        </div>
    )
}

const SelectOptions = ({ open, options, setOpen, onChange }) => {
    return (
        <>
            {open && (
                <ul className="absolute min-w-[150px] mt-1 bg-white border rounded shadow">
                    {options?.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-red-500 hover:text-white"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default SelectInput