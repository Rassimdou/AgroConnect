import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatModal = ({ isOpen, onClose, product, currentUser }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    // Mock conversations for sidebar (you can fetch real data later)
    const conversations = [
        {
            id: 1,
            name: product?.supplier || 'Seller',
            avatar: 'S',
            lastMessage: 'Hello! Interested in my products?',
            time: '2 min ago',
            unread: 0,
            active: true
        }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && product && currentUser) {
            console.log('🚀 Initializing socket connection for user:', currentUser, 'product:', product);
            // Initialize socket connection
            const newSocket = io('http://localhost:3000', {
                query: {
                    testId: currentUser.id,
                    testType: currentUser.type || 'user'
                }
            });

            newSocket.on('connect', () => {
                console.log('✅ Connected to chat server');
                setIsConnected(true);

                // Join conversation with the producer
                const producerId = product.producerInfo?.id || product.producer_id || 2; // Fallback to producer ID 2 for demo
                console.log('🔄 Joining conversation with producer ID:', producerId);
                newSocket.emit('join_conversation', {
                    targetId: producerId,
                    targetType: 'producer'
                });
            });

            newSocket.on('conversationHistory', (data) => {
                console.log('📚 Received conversation history:', data);
                setMessages(data.messages || []);
            });

            newSocket.on('receiveMessage', (message) => {
                console.log('💬 Received message:', message);
                setMessages(prev => [...prev, message]);
            });

            newSocket.on('chatError', (error) => {
                console.error('❌ Chat error:', error);
                alert('Chat error: ' + error.message);
            });

            newSocket.on('disconnect', () => {
                console.log('🔌 Disconnected from chat server');
                setIsConnected(false);
            });

            newSocket.on('connect_error', (error) => {
                console.error('🔌 Connection error:', error);
                setIsConnected(false);
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
                setSocket(null);
                setIsConnected(false);
            };
        }
    }, [isOpen, product, currentUser]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        console.log('Attempting to send message. Socket:', !!socket, 'Connected:', isConnected);

        if (!socket) {
            alert('Chat connection not established. Please refresh and try again.');
            return;
        }

        if (!isConnected) {
            // Allow sending even if not connected for testing
            console.log('Sending message while not connected (for testing)');
        }

        console.log('Sending message:', newMessage.trim());
        socket.emit('sendMessage', { content: newMessage.trim() });

        // Add message to local state immediately for better UX
        const tempMessage = {
            message_content: newMessage.trim(),
            sender_id: currentUser?.id,
            sender_type: currentUser?.type,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, tempMessage]);

        setNewMessage('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
                    {/* Header */}
                    <div className="p-4 bg-indigo-600 text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Messages</h2>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="p-4 bg-indigo-50 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                {currentUser?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold text-gray-900">{currentUser?.name || 'You'}</p>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    {isConnected ? 'Online' : 'Connecting...'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-2">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Conversations</h3>
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${conv.active ? 'bg-indigo-100 border-l-4 border-indigo-500' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {conv.avatar}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="font-semibold text-gray-900">{conv.name}</p>
                                            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                        </div>
                                        {conv.unread > 0 && (
                                            <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {conv.unread}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 bg-white border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                {product?.supplier?.charAt(0) || 'S'}
                            </div>
                            <div className="ml-3">
                                <h3 className="font-semibold text-gray-900">{product?.supplier || 'Seller'}</h3>
                                <p className="text-sm text-gray-500">{product?.name || 'Product Discussion'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {!isConnected && messages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                                <p>Connecting to chat server...</p>
                                <p className="text-sm text-gray-400 mt-2">Make sure the backend server is running</p>
                            </div>
                        ) : messages.length === 0 && isConnected ? (
                            <div className="text-center text-gray-500 mt-8">
                                <p>Start a conversation about {product?.name}</p>
                            </div>
                        ) : (
                            messages.map((message, index) => {
                                const isOwnMessage = message.sender_id === currentUser?.id && message.sender_type === currentUser?.type;
                                return (
                                    <div key={index} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${isOwnMessage ? 'bg-indigo-500 ml-2' : 'bg-gray-500 mr-2'
                                                }`}>
                                                {isOwnMessage ? (currentUser?.name?.charAt(0) || 'U') : (product?.supplier?.charAt(0) || 'S')}
                                            </div>
                                            <div className={`rounded-lg px-4 py-2 ${isOwnMessage
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-gray-200 text-gray-900'
                                                }`}>
                                                <p>{message.message_content}</p>
                                                <p className={`text-xs mt-1 ${isOwnMessage ? 'text-indigo-200' : 'text-gray-500'
                                                    }`}>
                                                    {new Date(message.created_at).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <form onSubmit={sendMessage} className="flex items-center space-x-2">
                            <button
                                type="button"
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                </svg>
                            </button>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={isConnected ? "Type your message..." : "Connecting to chat..."}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                            >
                                <span className="mr-2">Send</span>
                                <svg className="w-4 h-4 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
