import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaStripe } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";


const Footer = () => {
    return (
        <div className='w-full md:h-[370px] md:mt-0  h-[650px]  bg-primary p-8 text-white flex flex-col mb-0'>
            <div className="flex md:flex-row md:gap-20 flex-col">
                <div className="flex flex-col">
                    <p className="font-logo md:text-7xl font-semibold text-[#fff] text-4xl">Dami Cooks</p>
                    <img src="/images/PAPER_BAG_MOCKUP.png" className="w-40 h-40" />
                </div>
                <div className="flex flex-col text-gray-200 text-base">
                    <p className="mt-6 inline-flex items-start"><FaLocationDot className="mr-2 mt-1" />47 Milligan DriveEdinburghEH16 4DA</p>
                    <p className="mt-1 inline-flex items-center"><MdOutlinePhone className="mr-2" />+44 7507 276766</p>
                    <div className="flex gap-2 items-center">
                        <p className="mt-2 cursor-pointer inline-flex items-center">
                            <a
                                href={`https://www.instagram.com/dami._cooks?igsh=MWY1emprNmF0OGYxcA%3D%3D&utm_source=qr`}
                                target="_blank"
                                rel="noopener noreferrer"
                            ><FaInstagram className="mr-2" /></a></p>
                        <p className="mt-2 inline-flex items-center"><FaFacebook className="mr-2" /></p>
                        <p className="mt-2 inline-flex items-center"><FaTwitter className="mr-2" /></p>
                    </div>
                    <div>

                    </div>
                </div>
               
                <div className="md:ml-auto flex items-start md:mr-20 md:mt-0 mt-4">
                    <ul className="text-white text-4xl md:text-6xl flex items-center gap-2 md:gap-5">
                        <li>
                            <FaStripe />
                        </li>
                        <li>
                            <FaCcMastercard />
                        </li>
                        <li>
                            <FaCcVisa />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full h-[0.8px] bg-white my-6">
            </div>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 my-4">
                    <p>&copy; 2026 Dami Cooks. All rights reserved.</p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href="/privacy-policy" className="underline hover:text-gray-900">Privacy Policy</a>
                        <a href="/terms-of-service" className="underline hover:text-gray-900">Terms of Service</a>
                        <a href="/refund-policy" className="underline hover:text-gray-900">Refund & Cancellation Policy</a>
                    </div>
                </div>
        </div>
    )
}

export default Footer