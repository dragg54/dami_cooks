import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='w-full md:h-[270px] h-[290px]  bg-primary p-4 text-white flex flex-col'>
            <div className="flex md:flex-row md:gap-20 flex-col">
                <p className="font-logo md:text-7xl font-semibold text-[#fff] text-4xl">Dami Cooks</p>
                <div className="flex flex-col text-gray-200 text-sm">
                    <p className="mt-6 inline-flex items-start"><FaLocationDot className="mr-2 mt-1" /> 123 Perth Road, Dundee, DD1 4LN, Scotland, UK</p>
                    <p className="mt-1 inline-flex items-center"><MdOutlinePhone className="mr-2" />+43-4584-5844</p>
                    <p className="mt-1 inline-flex items-center"><MdOutlinePhone className="mr-2" />+43-4584-5856</p>
                    <div className="flex gap-2 items-center">
                        <p className="mt-2 inline-flex items-center"><FaInstagram className="mr-2" /></p>
                        <p className="mt-2 inline-flex items-center"><FaFacebook className="mr-2" /></p>
                        <p className="mt-2 inline-flex items-center"><FaTwitter className="mr-2" /></p>
                    </div>
                    <div>
                      
                    </div>
                </div>
            </div>
            <div className="w-full h-[0.8px] bg-white my-6">
            </div>
            <p className="font-semibold">© 2025, Dami Cooks</p>
        </div>
    )
}

export default Footer