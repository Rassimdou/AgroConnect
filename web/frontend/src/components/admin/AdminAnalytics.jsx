import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const AdminAnalytics = () => {
    const { t } = useTranslation();
    const [timeRange, setTimeRange] = useState('week');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Sample data for charts
    const salesData = [
        { name: t('Mon'), sales: 4000, orders: 24 },
        { name: t('Tue'), sales: 3000, orders: 18 },
        { name: t('Wed'), sales: 5000, orders: 32 },
        { name: t('Thu'), sales: 4500, orders: 28 },
        { name: t('Fri'), sales: 6000, orders: 38 },
        { name: t('Sat'), sales: 7000, orders: 45 },
        { name: t('Sun'), sales: 5500, orders: 35 }
    ];

    const userTypeData = [
        { name: t('Producers'), value: 400 },
        { name: t('Buyers'), value: 300 },
        { name: t('Transporters'), value: 200 }
    ];

    const productCategoryData = [
        { category: t('Fruits'), count: 120 },
        { category: t('Vegetables'), count: 98 },
        { category: t('Grains'), count: 86 },
        { category: t('Dairy'), count: 45 },
        { category: t('Livestock'), count: 32 }
    ];

    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

    const stats = [
        {
            title: t('Total Users'),
            value: '2,543',
            change: '+12.5%',
            trend: 'up',
            icon: '👥'
        },
        {
            title: t('Total Revenue'),
            value: '1.2M DZD',
            change: '+8.2%',
            trend: 'up',
            icon: '💰'
        },
        {
            title: t('Active Orders'),
            value: '342',
            change: '-3.1%',
            trend: 'down',
            icon: '📦'
        },
        {
            title: t('Products Listed'),
            value: '1,847',
            change: '+15.3%',
            trend: 'up',
            icon: '🌾'
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">{t('Loading analytics...')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('Analytics Dashboard')}</h1>
                <p className="text-gray-600">{t('Monitor your platform performance and insights')}</p>
            </div>

            {/* Time Range Selector */}
            <div className="mb-6 flex gap-2">
                {['today', 'week', 'month', 'year'].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${timeRange === range
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {t(range.charAt(0).toUpperCase() + range.slice(1))}
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">{stat.icon}</span>
                            <span
                                className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Sales Trend Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('Sales Trend')}</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#10b981"
                                strokeWidth={2}
                                name={t('Sales (DZD)')}
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                name={t('Orders')}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* User Distribution Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('User Distribution')}</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={userTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {userTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Product Categories Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('Product Categories')}</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productCategoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#10b981" name={t('Product Count')} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('Recent Activity')}</h2>
                <div className="space-y-4">
                    {[
                        { user: 'Ahmed Ben Ali', action: 'New producer registered', time: '5 min ago', type: 'user' },
                        { user: 'Fatima Zohra', action: 'Product listed', time: '12 min ago', type: 'product' },
                        { user: 'Mohamed Amine', action: 'Order completed', time: '23 min ago', type: 'order' },
                        { user: 'Salim Khelifi', action: 'New transporter registered', time: '1 hour ago', type: 'user' },
                        { user: 'Amina Benali', action: 'Payment received', time: '2 hours ago', type: 'payment' }
                    ].map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                                        activity.type === 'product' ? 'bg-green-100 text-green-600' :
                                            activity.type === 'order' ? 'bg-purple-100 text-purple-600' :
                                                'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {activity.type === 'user' ? '👤' :
                                        activity.type === 'product' ? '📦' :
                                            activity.type === 'order' ? '🛒' : '💳'}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{activity.user}</p>
                                    <p className="text-sm text-gray-600">{t(activity.action)}</p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{t(activity.time)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
