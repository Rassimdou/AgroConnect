import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Eye,
    MoreVertical,
    Package
} from 'lucide-react';
import axios from 'axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending_ai, approved_by_ai, revoked_by_ai
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [filter, page]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const statusQuery = filter !== 'all' ? `&status=${filter}` : '';
            const response = await axios.get(`http://localhost:3000/api/admin/products?page=${page}&limit=10${statusQuery}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProducts(response.data.products);
            setTotalPages(response.data.pagination.pages);
        } catch (err) {
            console.error('Error fetching products:', err);
            // Fallback data
            setProducts([
                { id: 1, name: 'Fresh Tomatoes', producer: { fullname: 'Green Farm' }, price: 2.50, quantity_available: 100, state: 'approved_by_ai', created_at: '2023-05-01' },
                { id: 2, name: 'Organic Potatoes', producer: { fullname: 'Organic Valley' }, price: 1.80, quantity_available: 500, state: 'pending_ai', created_at: '2023-05-02' },
                { id: 3, name: 'Sweet Corn', producer: { fullname: 'Sunny Fields' }, price: 0.50, quantity_available: 200, state: 'revoked_by_ai', created_at: '2023-05-03' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (productId, action) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put('http://localhost:3000/api/admin/products/status', {
                productId,
                action
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh list
            fetchProducts();
        } catch (err) {
            console.error('Error updating product status:', err);
            alert('Failed to update product status');
        }
    };

    const getStatusBadge = (state) => {
        switch (state) {
            case 'approved_by_ai':
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit"><CheckCircle size={12} className="mr-1" /> Approved</span>;
            case 'pending_ai':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center w-fit"><AlertTriangle size={12} className="mr-1" /> Pending</span>;
            case 'revoked_by_ai':
                return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center w-fit"><XCircle size={12} className="mr-1" /> Rejected</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center w-fit">{state}</span>;
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.producer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                    <p className="text-gray-500">Approve, reject, and monitor products</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('pending_ai')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'pending_ai' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilter('approved_by_ai')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'approved_by_ai' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        Approved
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products by name or producer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Producer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price/Qty</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No products found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                    {product.images && product.images.length > 0 ? (
                                                        <img src={product.images[0].image_url} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                                                    ) : (
                                                        <Package size={20} />
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {product.producer.fullname}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">${product.price}</div>
                                            <div className="text-xs text-gray-500">{product.quantity_available} available</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(product.state)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                {product.state === 'pending_ai' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusChange(product.id, 'approve')}
                                                            className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(product.id, 'reject')}
                                                            className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {product.state === 'approved_by_ai' && (
                                                    <button
                                                        onClick={() => handleStatusChange(product.id, 'reject')}
                                                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                                                    >
                                                        Revoke
                                                    </button>
                                                )}
                                                {product.state === 'revoked_by_ai' && (
                                                    <button
                                                        onClick={() => handleStatusChange(product.id, 'approve')}
                                                        className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md"
                                                    >
                                                        Re-approve
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

export default AdminProducts;
