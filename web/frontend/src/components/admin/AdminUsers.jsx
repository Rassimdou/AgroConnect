import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    XCircle,
    AlertTriangle,
    User,
    Truck,
    Store
} from 'lucide-react';
import axios from 'axios';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, user, producer, transporter
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, [filter, page]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const typeQuery = filter !== 'all' ? `&type=${filter}` : '';
            const response = await axios.get(`http://localhost:3000/api/admin/users?page=${page}&limit=10${typeQuery}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(response.data.users);
            setTotalPages(response.data.pagination.pages);
        } catch (err) {
            console.error('Error fetching users:', err);
            // Fallback data
            setUsers([
                { id: 1, fullname: 'John Doe', email: 'john@example.com', type: 'user', verified_status: 'verified', created_at: '2023-01-15' },
                { id: 2, fullname: 'Green Farm', email: 'farm@example.com', type: 'producer', verified_status: 'pending', created_at: '2023-02-20' },
                { id: 3, fullname: 'Fast Trans', email: 'trans@example.com', type: 'transporter', verified_status: 'verified', created_at: '2023-03-10' },
                { id: 4, fullname: 'Alice Smith', email: 'alice@example.com', type: 'user', verified_status: 'banned', created_at: '2023-04-05' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (userId, userType, action) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put('http://localhost:3000/api/admin/users/status', {
                userId,
                userType,
                action
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh list
            fetchUsers();
        } catch (err) {
            console.error('Error updating user status:', err);
            alert('Failed to update user status');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'verified':
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit"><CheckCircle size={12} className="mr-1" /> Verified</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center w-fit"><AlertTriangle size={12} className="mr-1" /> Pending</span>;
            case 'banned':
                return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center w-fit"><XCircle size={12} className="mr-1" /> Banned</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center w-fit">Unverified</span>;
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'producer': return <Store size={16} className="text-green-600" />;
            case 'transporter': return <Truck size={16} className="text-blue-600" />;
            default: return <User size={16} className="text-gray-600" />;
        }
    };

    const filteredUsers = users.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-500">Manage farmers, buyers, and transporters</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('user')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'user' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        Buyers
                    </button>
                    <button
                        onClick={() => setFilter('producer')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'producer' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        Farmers
                    </button>
                    <button
                        onClick={() => setFilter('transporter')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'transporter' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        Transporters
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Filter size={20} />
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No users found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                                                    {user.fullname.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.fullname}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-600 capitalize">
                                                <span className="mr-2">{getTypeIcon(user.type)}</span>
                                                {user.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(user.verified_status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.created_at || user.joined_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                {user.verified_status === 'pending' && (
                                                    <button
                                                        onClick={() => handleStatusChange(user.id, user.type, 'verify')}
                                                        className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md"
                                                    >
                                                        Verify
                                                    </button>
                                                )}
                                                {user.verified_status !== 'banned' ? (
                                                    <button
                                                        onClick={() => handleStatusChange(user.id, user.type, 'ban')}
                                                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                                                    >
                                                        Ban
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleStatusChange(user.id, user.type, 'unban')}
                                                        className="text-gray-600 hover:text-gray-900 bg-gray-50 px-3 py-1 rounded-md"
                                                    >
                                                        Unban
                                                    </button>
                                                )}
                                            </div>
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
        </div>
    );
};

export default AdminUsers;
