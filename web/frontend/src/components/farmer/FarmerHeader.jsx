import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const FarmerHeader = () => {
    const { currentUser, switchUser, users, conversations } = useUser();
    const [isInboxOpen, setIsInboxOpen] = useState(false);
    const navigate = useNavigate();

    const getParticipantName = (participants) => {
        const otherUser = participants.find(p => p._id !== currentUser._id);
        return otherUser ? otherUser.name : 'Unknown User';
    };

    const handleConversationClick = (convo) => {
        setIsInboxOpen(false);
        // Navigate to the chat page and open the specific conversation
        const participant = convo.participants.find(p => p._id !== currentUser._id);
        if (participant) {
            navigate(`/farmer/chat?with=${participant._id}`);
        } else {
            navigate('/farmer/chat');
        }
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div>
                    <div className="text-xl font-bold text-green-600">
                        <Link to="/farmer/dashboard">AgroConnect</Link>
                    </div>
                    <span className="text-sm text-gray-500">Logged in as: {currentUser.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/farmer/products" className="text-gray-600 hover:text-green-600">My Products</Link>

                    {/* --- INBOX DROPDOWN --- */}
                    <div className="relative">
                        <button onClick={() => setIsInboxOpen(!isInboxOpen)} className="text-gray-600 hover:text-green-600 flex items-center">
                            Inbox
                            {/* Optional: Unread messages count badge */}
                            {conversations.length > 0 && (
                                <span className="ml-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {conversations.length}
                                </span>
                            )}
                        </button>
                        {isInboxOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                                <div className="py-2">
                                    {conversations.length > 0 ? conversations.map(convo => (
                                        <div key={convo._id} onClick={() => handleConversationClick(convo)} className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2 cursor-pointer">
                                            <div className="mx-3">
                                                <h3 className="text-gray-600 font-semibold">{getParticipantName(convo.participants)}</h3>
                                                <p className="text-gray-600 text-sm">Click to view conversation.</p>
                                            </div>
                                        </div>
                                    )) : <div className="px-4 py-3 text-gray-500">No conversations yet.</div>}
                                </div>
                                <Link to="/farmer/chat" onClick={() => setIsInboxOpen(false)} className="block bg-gray-800 text-white text-center font-bold py-2">See all in Inbox</Link>
                            </div>
                        )}
                    </div>

                    {/* --- User Switcher for Demo --- */}
                    <div className="ml-4 border-l pl-4">
                        <span className="text-sm font-bold">Switch View:</span>
                        <button onClick={() => switchUser('producer')} className={`ml-2 text-sm p-1 rounded ${currentUser._id === users.producer._id ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Producer</button>
                        <button onClick={() => switchUser('buyer')} className={`ml-2 text-sm p-1 rounded ${currentUser._id === users.buyer._id ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Buyer</button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default FarmerHeader;