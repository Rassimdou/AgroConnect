import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

/**
 * Custom hook to manage Socket.IO chat connections
 * @param {number} userId - Current user's ID
 * @param {string} userType - Current user's type ('user' or 'producer')
 * @param {number} targetId - Target user's ID to chat with
 * @param {string} targetType - Target user's type ('user' or 'producer')
 * @param {boolean} enabled - Whether to establish the connection
 */
export const useChat = (userId, userType, targetId, targetType, enabled = false) => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Only connect if enabled and all required params are provided
        if (!enabled || !userId || !userType || !targetId || !targetType) {
            return;
        }

        setIsLoading(true);
        setError(null);

        // Initialize socket connection
        const socket = io(SOCKET_URL, {
            query: {
                testId: userId,
                testType: userType,
            },
            transports: ['websocket'],
        });

        socketRef.current = socket;

        // Connection event handlers
        socket.on('connect', () => {
            console.log('✅ Connected to chat server');
            setIsConnected(true);
            setIsLoading(false);

            // Join the conversation
            socket.emit('join_conversation', {
                targetId: parseInt(targetId),
                targetType: targetType,
            });
        });

        socket.on('disconnect', () => {
            console.log('🔌 Disconnected from chat server');
            setIsConnected(false);
        });

        socket.on('connect_error', (err) => {
            console.error('❌ Connection error:', err);
            setError('Failed to connect to chat server');
            setIsLoading(false);
            setIsConnected(false);
        });

        // Chat event handlers
        socket.on('conversationHistory', (data) => {
            console.log('📜 Received conversation history:', data);
            setConversationId(data.conversationId);
            setMessages(data.messages || []);
        });

        socket.on('receiveMessage', (message) => {
            console.log('📨 Received new message:', message);
            setMessages((prevMessages) => {
                const existingMsgIndex = prevMessages.findIndex(m => m.tempId && m.tempId === message.tempId);
                if (existingMsgIndex > -1) {
                    // This is a confirmation for a message we sent. Update its status.
                    return prevMessages.map((msg, index) => index === existingMsgIndex ? { ...message, status: 'sent' } : msg);
                }
                return [...prevMessages, message];
            });
        });

        socket.on('chatError', (error) => {
            console.error('⚠️ Chat error:', error);
            setError(error.message || 'An error occurred');
        });

        // Cleanup on unmount or when dependencies change
        return () => {
            if (socket) {
                console.log('🔌 Disconnecting socket');
                socket.disconnect();
            }
        };
    }, [enabled, userId, userType, targetId, targetType]);

    // Function to send a message
    const sendMessage = (content) => {
        if (!socketRef.current || !content.trim()) {
            console.warn('Cannot send message: socket not initialized or empty message');
            return;
        }

        const tempId = `temp_${Date.now()}`;
        const messagePayload = {
            content: content.trim(),
            tempId: tempId, // Temporary ID for optimistic UI
        };

        // Optimistically add message to UI with 'sending' status
        const optimisticMessage = {
            message_content: content.trim(),
            sender_id: userId,
            created_at: new Date().toISOString(),
            status: 'sending',
            tempId: tempId,
        };
        setMessages(prev => [...prev, optimisticMessage]);

        socketRef.current.emit('sendMessage', messagePayload);
    };

    return {
        messages,
        isConnected,
        isLoading,
        error,
        conversationId,
        sendMessage,
    };
};
