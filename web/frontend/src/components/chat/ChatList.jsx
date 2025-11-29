import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const ChatList = ({ onSelectConversation, onClose }) => {
    const { t } = useTranslation();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await api.get('/chat/conversations');
            setConversations(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching conversations:', err);
            setError(t('chat.failedLoad'));
            setLoading(false);
        }
    };

    const getOtherParticipant = (conversation) => {
        // Determine which participant is the "other" person
        if (conversation.participant_1_id === currentUser.id && conversation.participant_1_type === currentUser.role) {
            return {
                id: conversation.participant_2_id,
                type: conversation.participant_2_type,
                // In a real app, you'd join with user tables to get names. 
                // For now, we might just show ID or Type if name isn't available in the conversation record directly.
                // However, the backend *could* include this. 
                // Let's assume for now we just show "User #{id}" or similar if we don't have the name.
                // Ideally, the backend `getUserConversations` should include the other user's profile.
                // Since we didn't add that complexity yet, we'll display a generic name.
                name: `${conversation.participant_2_type} #${conversation.participant_2_id}`
            };
        } else {
            return {
                id: conversation.participant_1_id,
                type: conversation.participant_1_type,
                name: `${conversation.participant_1_type} #${conversation.participant_1_id}`
            };
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md h-[600px] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-green-600 text-white rounded-t-2xl">
                    <h3 className="font-bold text-lg">{t('chat.title')}</h3>
                    <button onClick={onClose} className="hover:bg-green-700 p-1 rounded-full transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 mt-4">{error}</div>
                    ) : conversations.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            <p className="text-4xl mb-2">💬</p>
                            <p>{t('chat.noConversations')}</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {conversations.map((conv) => {
                                const other = getOtherParticipant(conv);
                                const lastMsg = conv.messages && conv.messages[0];
                                return (
                                    <div
                                        key={conv.id}
                                        onClick={() => onSelectConversation(other.id, other.type)}
                                        className="p-3 hover:bg-gray-50 rounded-xl cursor-pointer border border-gray-100 transition-colors flex items-center space-x-3"
                                    >
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                                            {other.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="font-semibold text-gray-900 truncate">{other.name}</h4>
                                                {lastMsg && (
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(lastMsg.created_at).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">
                                                {lastMsg ? lastMsg.message_content : t('chat.noMessages')}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
