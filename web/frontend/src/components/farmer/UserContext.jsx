import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { getConversations } from '../../services/chatApi'; // Import the API call
const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// --- Mock Users for Demonstration ---
// In a real app, you would fetch user data after login.
// Replace these IDs with actual user IDs from your database (one buyer, one producer).
const MOCK_USERS = {
    buyer: { _id: 'buyer-id-123', name: 'John Buyer' },
    producer: { _id: 'producer-id-456', name: 'Jane Producer' },
};
// ------------------------------------

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(MOCK_USERS.producer);
    const [conversations, setConversations] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        // Fetch initial conversations when user changes
        const loadConversations = async () => {
            try {
                const initialConvos = await getConversations();
                setConversations(initialConvos);
            } catch (error) {
                console.error("Failed to load initial conversations", error);
            }
        };
        loadConversations();

        // Disconnect any existing socket connection when the user changes
        if (socketRef.current) {
            socketRef.current.disconnect();
        }

        // Establish a new connection for the current user
        socketRef.current = io(SOCKET_URL, {
            query: { userId: currentUser._id }, // Send user ID for authentication
            auth: { token: localStorage.getItem('authToken') }
        });

        // Listen for new conversations created for this user
        socketRef.current.on('newConversation', (newConvo) => {
            setConversations(prevConvos => [newConvo, ...prevConvos]);
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [currentUser]);

    // Function to simulate switching users
    const switchUser = (userType) => {
        setCurrentUser(MOCK_USERS[userType]);
    };

    const value = { currentUser, switchUser, users: MOCK_USERS, conversations, setConversations };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to easily access user context
export const useUser = () => {
    return useContext(UserContext);
};