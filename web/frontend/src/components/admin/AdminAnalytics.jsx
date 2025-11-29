import { useState, useEffect } from 'react';
import {
    BarChart3,
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign
} from 'lucide-react';
import axios from 'axios';

const AdminAnalytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('30'); // 7, 30, 90, 365

    useEffect(() => {
        fetchAnalytics();
    }, [period]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            // Mock API call
            // const response = await axios.get(`http://localhost:3000/api/admin/analytics?period=${period}`, {
            //   headers: { Authorization: `Bearer ${token}` }
            // });
            // setAnalyticsData(response.data);

            // Mock data
            setTimeout(() => {
                setAnalyticsData({
                    userGrowth: [
                        { date: '2023-05-01', count: 120 },
                        { date: '2023-05-05', count: 135 },
                        { date: '2023-05-10', count: 150 },
                        { date: '2023-05-15', count: 180 },
                        { date: '2023-05-20', count: 210 },
                        { date: '2023-05-25', count: 250 },
                    ],
                    productCategories: [
                        { category: 'Vegetables', count: 150 },
                        { category: 'Fruits', count: 120 },
                        { category: 'Grains', count: 80 },
                        { category: 'Dairy', count: 40 },
                    ],
                    transactionVolume: [
                        { date: '2023-05-01', volume: 5000 },
                        { date: '2023-05-05', volume: 6200 },
                        { date: '2023-05-10', volume: 5800 },
                        { date: '2023-05-15', volume: 7500 },
                        { date: '2023-05-20', volume: 8900 },
                        { date: '2023-05-25', volume: 9500 },
                    ]
                });
                setLoading(false);
            }, 500);
        } catch (err) {
            console.error('Error fetching analytics:', err);
            setLoading(false);
        }
    };

    const SimpleBarChart = ({ data, dataKey, labelKey, color = 'bg-green-500' }) => {
        if (!data || data.length === 0) return <div>No data available</div>;

        const maxVal = Math.max(...data.map(d => d[dataKey]));

        return (
            <div className="flex items-end justify-between h-48 gap-2 pt-6">
                {data.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 group">
                        <div className="relative w-full flex justify-center">
                            <div
                                className={`w-full max-w-[30px] rounded-t-md transition-all duration-500 ${color} opacity-80 group-hover:opacity-100`}
                                style={{ height: `${(item[dataKey] / maxVal) * 100}%`, minHeight: '4px' }}
                            ></div>
                            <div className="absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {item[dataKey]}
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                            {new Date(item[labelKey]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const SimplePieChart = ({ data, valueKey, labelKey }) => {
        if (!data || data.length === 0) return <div>No data available</div>;

        const total = data.reduce((acc, curr) => acc + curr[valueKey], 0);
        const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500'];

        return (
            <div className="space-y-4">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${colors[idx % colors.length]}`}></div>
                            <span className="text-sm text-gray-600">{item[labelKey]}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-800 mr-3">{item[valueKey]}</span>
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${colors[idx % colors.length]}`}
                                    style={{ width: `${(item[valueKey] / total) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
                    <p className="text-gray-500">Platform performance and growth metrics</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex">
                    {['7', '30', '90', '365'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${period === p ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            {p === '365' ? '1 Year' : `${p} Days`}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                                <Users size={18} className="mr-2 text-blue-500" />
                                User Growth
                            </h3>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <SimpleBarChart
                            data={analyticsData?.userGrowth}
                            dataKey="count"
                            labelKey="date"
                            color="bg-blue-500"
                        />
                    </div>

                    {/* Transaction Volume Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                                <DollarSign size={18} className="mr-2 text-green-500" />
                                Transaction Volume
                            </h3>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
                        </div>
                        <SimpleBarChart
                            data={analyticsData?.transactionVolume}
                            dataKey="volume"
                            labelKey="date"
                            color="bg-green-500"
                        />
                    </div>

                    {/* Product Categories */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                                <ShoppingBag size={18} className="mr-2 text-purple-500" />
                                Product Categories
                            </h3>
                        </div>
                        <SimplePieChart
                            data={analyticsData?.productCategories}
                            valueKey="count"
                            labelKey="category"
                        />
                    </div>

                    {/* Key Metrics Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-6 flex items-center">
                            <TrendingUp size={18} className="mr-2 text-orange-500" />
                            Key Performance Indicators
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Avg. Order Value</p>
                                <p className="text-xl font-bold text-gray-800">$45.20</p>
                                <p className="text-xs text-green-600 mt-1">↑ 2.5%</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                                <p className="text-xl font-bold text-gray-800">3.8%</p>
                                <p className="text-xs text-red-600 mt-1">↓ 0.4%</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Return Rate</p>
                                <p className="text-xl font-bold text-gray-800">1.2%</p>
                                <p className="text-xs text-green-600 mt-1">↓ 0.2%</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">User Retention</p>
                                <p className="text-xl font-bold text-gray-800">68%</p>
                                <p className="text-xs text-green-600 mt-1">↑ 5.0%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAnalytics;
