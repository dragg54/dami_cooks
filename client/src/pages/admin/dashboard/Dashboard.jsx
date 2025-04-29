import AnalyticsCard from "./AnalyticsCard"
import { RiFileList3Fill } from "react-icons/ri";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { MdOutlineFreeCancellation } from "react-icons/md";
import AnalyticsBarChart from "./AnalyticsBarChart";
import AnalyticsPieChart from "./AnalyticsPieChart";
import { FetchOrders } from "./api/FetchAllOrders";
import { euro } from "../../../constants/Currency";
import { FetchTotalRevenue } from "./api/FetchTotalRevenue";

const Dashboard = () => {
  const {data: orderAggregates, isLoading: isDataAggregatesLoading} = FetchOrders({})
  const {data: totalRevenue, isLoading: totalRevenueLoading} = FetchTotalRevenue({})
  
  return (
    <div className="w-full h-full flex flex-col ">
     <div className="w-full flex justify-between">
        <AnalyticsCard {...{title: "Total Revenue", isLoading:totalRevenueLoading, value: `${euro}${totalRevenue || 0}`, icon:< RiMoneyEuroCircleLine />}}/>
        <AnalyticsCard {...{title: "Total Order", isLoading:isDataAggregatesLoading, value: orderAggregates?.totalOrders, icon:<RiFileList3Fill />}}/>
        <AnalyticsCard {...{title: "Total Cancelled",isLoading:isDataAggregatesLoading, value: orderAggregates?.totalCancelled, icon:< MdOutlineFreeCancellation/>}}/>
     </div>
    <div className="w-full flex md:flex-row flex-col md:mt-6 md:gap-4">
    <AnalyticsBarChart />
    <AnalyticsPieChart />
    </div>
    </div>
  )
}

export default Dashboard