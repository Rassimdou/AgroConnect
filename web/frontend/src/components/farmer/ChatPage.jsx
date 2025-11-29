import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { startConversation } from '../../services/chatApi';
import ChatWindow from '../components/chat/ChatWindow';
import { useUser } from '../context/UserContext';

// A hook to parse URL query parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ChatPage = () => {
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [error, setError] = useState(null);
    const { currentUser, conversations, setConversations } = useUser();
    const query = useQuery();
    const producerIdFromUrl = query.get('with');

    useEffect(() => {
        const handleUrlParam = async () => {
            if (producerIdFromUrl) {
                const existingConvo = conversations.find(c => c.participants.some(p => p._id === producerIdFromUrl));
                if (existingConvo) {
                    setSelectedConversationId(existingConvo._id);
                } else {
                    // If a conversation is started from a URL param and doesn't exist, create it.
                    try {
                        const newConvo = await startConversation(producerIdFromUrl);
                        // The UserContext socket listener will add it to the conversations list.
                        setSelectedConversationId(newConvo._id);
                    } catch (startConvoError) {
                        setError('Could not start a new conversation.');
                    }
                }
            } else if (conversations.length > 0 && !selectedConversationId) {
                // If no chat is selected, default to the first in the list.
                setSelectedConversationId(conversations[0]._id);
            }
        };
        handleUrlParam();
    }, [producerIdFromUrl, conversations, selectedConversationId, setConversations]);

    // This effect handles selecting a conversation from the (potentially updated) list
    useEffect(() => {
        if (conversations.length > 0 && !conversations.find(c => c._id === selectedConversationId)) {
            setSelectedConversationId(conversations[0]._id);
        }
    }, [conversations, selectedConversationId]);


    // Helper to get the other participant's name for display
    const getParticipantName = (participants) => {
        const otherUser = participants.find(p => p._id !== currentUser._id);
        return otherUser ? otherUser.name : 'Unknown User';
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Conversations List */}
            <div className="w-1/3 border-r bg-white">
                <div className="p-4 font-bold text-lg border-b">Conversations</div>
                <ul>
                    {conversations.map((convo) => (
                        <li
                            key={convo._id}
                            className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedConversationId === convo._id ? 'bg-green-100' : ''}`}
                            onClick={() => setSelectedConversationId(convo._id)}
                        >
                            {getParticipantName(convo.participants)}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Window */}
            <div className="w-2/3">
                <ChatWindow conversationId={selectedConversationId} currentUserId={currentUser._id} />
            </div>
        </div>
    );
};

export default ChatPage;