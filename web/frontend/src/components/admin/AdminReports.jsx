import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Flag,
    CheckCircle,
    XCircle,
    AlertTriangle,
    MessageSquare,
    User,
    Package
} from 'lucide-react';
import axios from 'axios';

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, resolved, dismissed
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchReports();
    }, [filter, page]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            // Mock API call - replace with actual endpoint
            // const response = await axios.get(`http://localhost:3000/api/admin/reports?page=${page}&limit=10&status=${filter}`, {
            //   headers: { Authorization: `Bearer ${token}` }
            // });

            // setReports(response.data.reports);
            // setTotalPages(response.data.pagination.pages);

            // Mock data
            setTimeout(() => {
                setReports([
                    {
                        id: 1,
                        reporter: { fullname: 'John Doe', type: 'user' },
                        reported: { fullname: 'Bad Seller', type: 'producer' },
                        cause: 'Fake Product',
                        description: 'The product received was plastic, not real fruit.',
                        status: 'pending',
                        created_at: '2023-05-12'
                    },
                    {
                        id: 2,
                        reporter: { fullname: 'Jane Smith', type: 'user' },
                        reported: { fullname: 'Slow Trans', type: 'transporter' },
                        cause: 'Abuse',
                        description: 'Driver was rude and aggressive.',
                        status: 'investigating',
                        created_at: '2023-05-13'
                    },
                    {
                        id: 3,
                        reporter: { fullname: 'Green Farm', type: 'producer' },
                        reported: { fullname: 'Scam Buyer', type: 'user' },
                        cause: 'Spam',
                        description: 'User keeps spamming fake orders.',
                        status: 'resolved',
                        created_at: '2023-05-10'
                    },
                ]);
                setLoading(false);
            }, 500);

        } catch (err) {
            console.error('Error fetching reports:', err);
            setLoading(false);
        }
    };

    const handleStatusChange = async (reportId, status) => {
        // TODO: Implement API call
        console.log(`Updating report ${reportId} to ${status}`);
        setReports(reports.map(r => r.id === reportId ? { ...r, status } : r));
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'resolved':
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit"><CheckCircle size={12} className="mr-1" /> Resolved</span>;
            case 'investigating':
                return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center w-fit"><Search size={12} className="mr-1" /> Investigating</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center w-fit"><AlertTriangle size={12} className="mr-1" /> Pending</span>;
            case 'dismissed':
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center w-fit"><XCircle size={12} className="mr-1" /> Dismissed</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center w-fit">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Content Moderation</h1>
                    <p className="text-gray-500">Review reports and manage disputes</p>
                </div>

                <div className="flex gap-2">
                    {['all', 'pending', 'investigating', 'resolved', 'dismissed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${filter === status ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
                        <Flag size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>No reports found matching your criteria.</p>
                    </div>
                ) : (
                    reports.map((report) => (
                        <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                        <Flag size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{report.cause}</h3>
                                        <p className="text-sm text-gray-500">Reported on {new Date(report.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                {getStatusBadge(report.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Reporter</h4>
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 mr-2">
                                            {report.reporter.fullname.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{report.reporter.fullname}</p>
                                            <p className="text-xs text-gray-500 capitalize">{report.reporter.type}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Reported Entity</h4>
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 mr-2">
                                            {report.reported.fullname.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{report.reported.fullname}</p>
                                            <p className="text-xs text-gray-500 capitalize">{report.reported.type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg text-sm">
                                    {report.description}
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-4">
                                {report.status !== 'resolved' && report.status !== 'dismissed' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(report.id, 'dismissed')}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Dismiss
                                        </button>
                                        {report.status === 'pending' && (
                                            <button
                                                onClick={() => handleStatusChange(report.id, 'investigating')}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                                            >
                                                Investigate
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleStatusChange(report.id, 'resolved')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                                        >
                                            Resolve
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminReports;
