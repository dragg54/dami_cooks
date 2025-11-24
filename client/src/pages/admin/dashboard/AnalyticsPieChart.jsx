import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
    { name: "Delivered", value: 200 },
    { name: "Cancelled", value: 50 }
]
const COLORS = ['#14e114', '#ff2511'];
const AnalyticsPieChart = () => {
    return (
        <div className="w-full md:w-[40%] bg-white mt-3 h-[320px] md:h-[320px] pt-5 pb-4 rounded-md shadow-md shadow-gray-300">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={200} height={120}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={100}
                        fill="#ff2511"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell fontSize={'12px'} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    <text x={80} y={12} fill="#383940" textAnchor="middle" dominantBaseline="central">
                        <tspan fontSize="16" fontWeight={600}>Total Order</tspan>
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AnalyticsPieChart