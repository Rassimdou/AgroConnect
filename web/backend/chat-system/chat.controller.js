import { findOrCreateConversation, createMessage, getConversationHistory } from "./chat.service.js";

//import { decodeChatToken } from "./chat.auth"; 

const UserSockets = new Map(); // Maps userKey (e.g., 'user-101') to their Socket ID

export const initialize = (io) => {

    // --- TEMPORARY AUTH BYPASS MIDDLEWARE (FIXED FOR ID TYPES) ---
    io.use((socket, next) => {
        const testId = socket.handshake.query.testId;
        const testType = socket.handshake.query.testType;

        if (!testId || !testType) {
            return next(new Error('Missing testId or testType for temporary authentication.'));
        }

        //  Cast the ID to integer for Prisma compatibility
        const currentUserId = parseInt(testId);

        if (isNaN(currentUserId)) {
            return next(new Error('testId must be a valid number.'));
        }

        // Attach user info to socket object (ID is now an INT)
        socket.data.user = {
            id: currentUserId,
            type: testType
        };
        next();
    });


    // Main Connection Listener
    io.on('connection', (socket) => {
        const AuthUser = socket.data.user;
        // Create a unique key for the user (e.g., "user-101" or "producer-202")
        const userKey = `${AuthUser.type}-${AuthUser.id}`;

        // Register the active socket for future direct targeting (e.g., notifications)
        UserSockets.set(userKey, socket.id);
        console.log(`User connected: ${userKey} with socket ID: ${socket.id}`);

        //  CLIENT ASKS TO JOIN A CONVERSATION 
        socket.on('join_conversation', async ({ targetId, targetType }) => {
            const currentUserId = AuthUser.id; // Already an Int from middleware
            const currentUserType = AuthUser.type;

            try {
                // Ensure targetId is also an integer before passing to service
                const intTargetId = parseInt(targetId);

                if (isNaN(intTargetId)) {
                    return socket.emit('chatError', { message: 'Target ID must be a number.' });
                }

                const conversation = await findOrCreateConversation(
                    currentUserId,
                    currentUserType,
                    intTargetId,
                    targetType
                );

                const roomName = `conversation-${conversation.id}`;

                // Manage room: leave previous room and join new one
                if (socket.data.room) {
                    socket.leave(socket.data.room);
                }

                socket.join(roomName);

                // Save conversation context to the socket
                socket.data.room = roomName;
                socket.data.conversationId = conversation.id;

                // Load and send conversation history to client
                const history = await getConversationHistory(conversation.id);
                socket.emit('conversationHistory', {
                    conversationId: conversation.id,
                    messages: history.reverse(), // Reverse to display oldest first
                });
            } catch (error) {
                // Log detailed error and send simple error to client
                console.error("CRITICAL PRISMA ERROR on join_conversation:", error.stack);
                socket.emit('chatError', { message: 'Server error during conversation setup.' });
            }
        });

        // CLIENT SENDS A MESSAGE
        socket.on('sendMessage', async (messageData) => {
            const { content, tempId } = messageData;
            const roomName = socket.data.room;
            const conversationId = socket.data.conversationId;

            if (!roomName || !content || !conversationId) {
                return socket.emit('chatError', { message: 'Not currently in a valid conversation room or message is empty.' });
            }

            try {
                //  Save the message to the database
                const savedMessage = await createMessage(
                    conversationId,
                    AuthUser.id,
                    AuthUser.type,
                    content
                );

                // Attach tempId back to the message so client can deduplicate/update optimistic UI
                const messageToEmit = { ...savedMessage, tempId };

                // This will send the message back to the sender AND the receiver
                io.to(roomName).emit('receiveMessage', messageToEmit);

            } catch (error) {
                console.error(`Error sending message for ${userKey}:`, error.stack);
                socket.emit('chatError', { message: 'Failed to send message.' });
            }
        });

        //Disconnection
        socket.on('disconnect', () => {
            UserSockets.delete(userKey);
            console.log(`User disconnected: ${userKey}`);
        });
    });
};