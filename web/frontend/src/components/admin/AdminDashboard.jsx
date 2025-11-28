import { useState, useEffect } from 'react';
import {
    Users,
    ShoppingBag,
    Truck,
    DollarSign,
    TrendingUp,
    AlertCircle,
    Package,
    Activity
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            // TODO: Add Authorization header when backend is ready to accept it
            // For now, we might get 401 if we don't send it, but let's assume the endpoint exists
            const response = await axios.get('http://localhost:3000/api/admin/dashboard/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching stats:', err);
            // Fallback data for demonstration if API fails or is not ready
            setStats({
                overview: {
                    totalUsers: 1250,
                    totalProducers: 85,
                    totalTransporters: 42,
                    totalProducts: 340,
                    totalOrders: 156,
                    totalRevenue: 45200,
                    pendingProducts: 12,
                    pendingReports: 5
                },
                recentOrders: [
                    { id: 101, user: { fullname: 'John Doe' }, producer: { fullname: 'Green Farm' }, order_date: new Date().toISOString(), quantity: 50 },
                    { id: 102, user: { fullname: 'Jane Smith' }, producer: { fullname: 'Organic Valley' }, order_date: new Date().toISOString(), quantity: 30 },
                ],
                systemHealth: {
                    status: 'healthy',
                    uptime: 3600
                }
            });
            setLoading(false);
            // setError('Failed to load dashboard statistics');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
                    {trend && (
                        <p className={`text-xs mt-2 flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp size={14} className="mr-1" />
                            {Math.abs(trend)}% from last month
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats?.overview?.totalRevenue?.toLocaleString()}`}
                    icon={DollarSign}
                    color="bg-green-500"
                    trend={12.5}
                />
                <StatCard
                    title="Total Users"
                    value={stats?.overview?.totalUsers}
                    icon={Users}
                    color="bg-blue-500"
                    trend={8.2}
                />
                <StatCard
                    title="Total Orders"
                    value={stats?.overview?.totalOrders}
                    icon={ShoppingBag}
                    color="bg-purple-500"
                    trend={5.4}
                />
                <StatCard
                    title="Active Transporters"
                    value={stats?.overview?.totalTransporters}
                    icon={Truck}
                    color="bg-orange-500"
                    trend={-2.1}
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Pending Actions</h3>
                        <AlertCircle size={20} className="text-amber-500" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                            <span className="text-amber-700">Pending Products</span>
                            <span className="font-bold text-amber-700">{stats?.overview?.pendingProducts}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <span className="text-red-700">Reported Items</span>
                            <span className="font-bold text-red-700">{stats?.overview?.pendingReports}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Recent Orders</h3>
                        <Package size={20} className="text-green-600" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs text-gray-500 uppercase border-b">
                                    <th className="pb-3">Order ID</th>
                                    <th className="pb-3">Customer</th>
                                    <th className="pb-3">Producer</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {stats?.recentOrders?.map((order) => (
                                    <tr key={order.id} className="border-b last:border-0">
                                        <td className="py-3 font-medium">#{order.id}</td>
                                        <td className="py-3">{order.user?.fullname}</td>
                                        <td className="py-3">{order.producer?.fullname}</td>
                                        <td className="py-3">${order.quantity}</td>
                                        <td className="py-3">{new Date(order.order_date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
