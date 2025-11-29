import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Eye,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle
} from 'lucide-react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, processing, shipped, delivered, cancelled
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, [filter, page]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const statusQuery = filter !== 'all' ? `&status=${filter}` : '';
            const response = await axios.get(`http://localhost:3000/api/admin/orders?page=${page}&limit=10${statusQuery}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrders(response.data.orders);
            setTotalPages(response.data.pagination.pages);
        } catch (err) {
            console.error('Error fetching orders:', err);
            // Fallback data
            setOrders([
                {
                    id: 101,
                    user: { fullname: 'John Doe', email: 'john@example.com' },
                    producer: { fullname: 'Green Farm', email: 'farm@example.com' },
                    order_date: '2023-05-10',
                    order_status: 'pending',
                    quantity: 50,
                    order_details: [{ product: { name: 'Fresh Tomatoes', price: 2.50 } }]
                },
                {
                    id: 102,
                    user: { fullname: 'Jane Smith', email: 'jane@example.com' },
                    producer: { fullname: 'Organic Valley', email: 'organic@example.com' },
                    order_date: '2023-05-11',
                    order_status: 'shipped',
                    quantity: 30,
                    order_details: [{ product: { name: 'Organic Potatoes', price: 1.80 } }]
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, status) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put('http://localhost:3000/api/admin/orders/status', {
                orderId,
                status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh list
            fetchOrders();
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder(prev => ({ ...prev, order_status: status }));
            }
        } catch (err) {
            console.error('Error updating order status:', err);
            alert('Failed to update order status');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'delivered':
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit"><CheckCircle size={12} className="mr-1" /> Delivered</span>;
            case 'shipped':
                return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center w-fit"><Truck size={12} className="mr-1" /> Shipped</span>;
            case 'processing':
                return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center w-fit"><Package size={12} className="mr-1" /> Processing</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center w-fit"><Clock size={12} className="mr-1" /> Pending</span>;
            case 'cancelled':
                return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center w-fit"><XCircle size={12} className="mr-1" /> Cancelled</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center w-fit">{status}</span>;
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(searchTerm) ||
        order.user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.producer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
                    <p className="text-gray-500">Track and manage all platform transactions</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === status ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search orders by ID, buyer, or producer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex gap-6">
                {/* Orders Table */}
                <div className={`flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all ${selectedOrder ? 'w-2/3' : 'w-full'}`}>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Buyer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Producer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            <div className="flex justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            No orders found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedOrder?.id === order.id ? 'bg-green-50' : ''}`}
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                #{order.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {order.user.fullname}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {order.producer.fullname}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ${order.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(order.order_status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.order_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedOrder(order);
                                                    }}
                                                    className="text-gray-400 hover:text-green-600"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Order Details Panel */}
                {selectedOrder && (
                    <div className="w-1/3 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[calc(100vh-12rem)] sticky top-24">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                            <h3 className="font-bold text-gray-800">Order #{selectedOrder.id}</h3>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</h4>
                                <div className="flex items-center justify-between">
                                    {getStatusBadge(selectedOrder.order_status)}
                                    <select
                                        className="ml-2 text-sm border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        value={selectedOrder.order_status}
                                        onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Buyer</h4>
                                    <p className="font-medium text-gray-900">{selectedOrder.user.fullname}</p>
                                    <p className="text-sm text-gray-500">{selectedOrder.user.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Producer</h4>
                                    <p className="font-medium text-gray-900">{selectedOrder.producer.fullname}</p>
                                    <p className="text-sm text-gray-500">{selectedOrder.producer.email}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Order Items</h4>
                                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                    {selectedOrder.order_details?.map((detail, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <span>{detail.product.name}</span>
                                            <span className="font-medium">${detail.product.price}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${selectedOrder.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
