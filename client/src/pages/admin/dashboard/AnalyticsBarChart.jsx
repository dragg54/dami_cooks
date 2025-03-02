import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getScreenSize } from '../../../utils/getScreenSize';

let processedData = [
    {
        day: 'Mon',
        sales: 20

    },
    {
        day: 'Tue',
        sales: 25

    },
    {
        day: 'Wed',
        sales: 15

    },
    {
        day: 'Thu',
        sales: 30

    },
    {
        day: 'Fri',
        sales: 23

    },
    {
        day: 'Sat',
        sales: 40

    },
    {
        day: 'Sun',
        sales: 15

    }


]
const AnalyticsBarChart = () => {
    return (
        <div className='mt-4 border  border-gray-300 bg-white rounded-md md:pt-6 shadow-sm flex mx-auto h-[300px] justify-center text-xs pt-2 md:h-[360px]' style={{ width: '100%' }}>
            {
                <ResponsiveContainer height={'100%'}>
                    <BarChart
                        data={processedData}
                        margin={{ top: 20, bottom: 4, right: 12, left: -18 }}
                        padding={{ top: 3 }}
                        barSize={getScreenSize().isMobile ? 30 : 50}
                    >
                        <XAxis dataKey="day" />
                        <YAxis domain={[0, 50]} />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#d01110" name='Orders' />
                        <text x={130} y={7} fill="#383940" textAnchor="middle" dominantBaseline="central">
                            <tspan fontSize={getScreenSize().isMobile ? "16": "20"}  fontWeight={600}>Revenue Chart</tspan>
                        </text>
                    </BarChart>
                </ResponsiveContainer>
            }
        </div>
    );
}

export default AnalyticsBarChart