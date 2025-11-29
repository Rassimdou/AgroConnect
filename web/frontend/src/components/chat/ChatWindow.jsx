import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useChat } from '../../hooks/useChat';

const ChatWindow = ({ currentUser, targetId, targetType, onClose }) => {
    const { t } = useTranslation();
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const {
        messages: chatMessages,
        isConnected,
        isLoading: chatLoading,
        error: chatError,
        sendMessage
    } = useChat(
        currentUser?.id,
        currentUser?.role || 'user',
        targetId,
        targetType,
        true // Always connect when this window is open
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && isConnected) {
            sendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col transform transition-all">
                {/* Header */}
                <div className="p-4 bg-green-600 text-white rounded-t-2xl flex justify-between items-center shadow-md">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-xl">👤</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{t('chat.windowTitle')}</h3>
                            <div className="flex items-center space-x-2 text-xs text-green-100">
                                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-300' : 'bg-red-300'}`}></span>
                                <span>{chatLoading ? t('chat.connecting') : isConnected ? t('chat.online') : t('chat.offline')}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {chatLoading && (
                        <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        </div>
                    )}

                    {chatError && (
                        <div className="text-center text-red-500 py-4 bg-red-50 rounded-lg mx-4">
                            <p>{chatError}</p>
                        </div>
                    )}

                    {chatMessages.map((msg, index) => {
                        const isSentByMe = msg.sender_id == currentUser?.id && msg.sender_type === currentUser?.role;
                        return (
                            <div
                                key={`${msg.id || 'temp'}-${index}`}
                                className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${isSentByMe
                                        ? 'bg-green-600 text-white rounded-br-sm'
                                        : 'bg-white text-gray-800 rounded-bl-sm'
                                        }`}
                                >
                                    <p className="text-sm">{msg.message_content}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isSentByMe ? 'text-green-100' : 'text-gray-400'}`}>
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={t('chat.typeMessage')}
                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            disabled={!isConnected}
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || !isConnected}
                            className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
