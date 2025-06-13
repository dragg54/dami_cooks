import { getScreenSize } from "@/utils/getScreenSize";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", orders: 30 },
  { name: "Feb", orders: 45 },
  { name: "Mar", orders: 60 },
  { name: "Apr", orders: 50 },
  { name: "May", orders: 80 },
];

const AnalyticsGraph = () => {
  return (
    <div className="w-2/5 md:h-[320px] bg-white rounded-md shadow-md shadow-gray-400 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 48, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <text x={80} y={20} fill="#383940" textAnchor="middle" dominantBaseline="central">
                        <tspan fontSize="16" fontWeight={600}>Orders</tspan>
                    </text>
          <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsGraph;
