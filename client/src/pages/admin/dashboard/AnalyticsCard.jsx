/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { MdOutlineShowChart } from "react-icons/md";

const AnalyticsCard = ({ title, value, icon }) => {
    return (
        <div className="w-[32%] md:h-[110px] md:gap-10 items-center flex justify-start gap-2 p-3 h-[80px] bg-white rounded-md shadow-md shadow-gray-400">
            <div className="w-6 h-6 md:h-20 md:w-20 md:text-5xl flex text-gray-600 items-center justify-center rounded-full bg-secondary">
                {icon}
            </div>
            <div>
                <p className="text-base md:text-4xl text-gray-600 font-semibold">{value}</p>
                <p className="text-[0.5rem] md:text-[0.85rem] text-gray-500">{title}</p>
                <p className="text-green-600 inline-flex items-center gap-1 md:text-base text-[0.5rem]"><MdOutlineShowChart />+20</p>
            </div>
        </div>
    )
}

export default AnalyticsCard