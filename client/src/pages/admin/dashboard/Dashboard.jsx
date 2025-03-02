import AnalyticsCard from "./AnalyticsCard"
import { RiFileList3Fill } from "react-icons/ri";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { MdOutlineFreeCancellation } from "react-icons/md";
import AnalyticsBarChart from "./AnalyticsBarChart";
import AnalyticsPieChart from "./AnalyticsPieChart";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col ">
     <div className="w-full flex justify-between">
        <AnalyticsCard {...{title: "Total Revenue", value: "$12333", icon:< RiMoneyEuroCircleLine />}}/>
        <AnalyticsCard {...{title: "Total Order", value: "250", icon:<RiFileList3Fill />}}/>
        <AnalyticsCard {...{title: "Total Cancelled", value: "30", icon:< MdOutlineFreeCancellation/>}}/>
     </div>
    <div className="w-full flex md:flex-row flex-col md:mt-6 md:gap-4">
    <AnalyticsBarChart />
    <AnalyticsPieChart />
    </div>
    </div>
  )
}

export default Dashboard