import prisma from '../prisma/client.js'; // Adjust path as necessary

/**
 * Finds an existing chat conversation between two parties, regardless of which party is P1 or P2,
 * or creates a new one if it doesn't exist.
 *
 * @param {number} currentId - The ID of the currently authenticated user.
 * @param {string} currentType - The type of the currently authenticated user (e.g., 'user', 'producer').
 * @param {number} targetId - The ID of the person they want to chat with.
 * @param {string} targetType - The type of the target person.
 * @returns {Promise<object>} The existing or newly created ChatConversation object.
 */
export const findOrCreateConversation = async (currentId, currentType, targetId, targetType) => {
    // 1. Search for conversation in either order (P1/P2 or P2/P1)
    let conversation = await prisma.chatConversation.findFirst({
        where: {
            OR: [
                // Case 1: Current user is Participant 1, Target is Participant 2
                {
                    participant_1_id: currentId,
                    participant_1_type: currentType,
                    participant_2_id: targetId,
                    participant_2_type: targetType,
                },
                // Case 2: Target is Participant 1, Current user is Participant 2 (Swapped)
                {
                    participant_1_id: targetId,
                    participant_1_type: targetType,
                    participant_2_id: currentId,
                    participant_2_type: currentType,
                },
            ],
        },
    });

    if (conversation) {
        // If found, update last_message_at and return
        await prisma.chatConversation.update({
            where: { id: conversation.id },
            data: { last_message_at: new Date() },
        });
        return conversation;
    }

    // 2. If no conversation exists, create a new one.
    // We establish a canonical order (e.g., lower ID is P1) to avoid creating duplicates,
    // but here we simply create it using the received order.
    conversation = await prisma.chatConversation.create({
        data: {
            participant_1_id: currentId,
            participant_1_type: currentType,
            participant_2_id: targetId,
            participant_2_type: targetType,
            last_message_at: new Date(),
        },
    });

    return conversation;
};

/**
 * Creates a new message and updates the conversation's last message time.
 */
export const createMessage = async (conversationId, senderId, senderType, content) => {
    // Use transaction to ensure both message creation and conversation update succeed or fail together
    const [savedMessage] = await prisma.$transaction([
        // 1. Create the new chat message
        prisma.chatMessage.create({
            data: {
                conversation_id: conversationId,
                sender_id: senderId,
                sender_type: senderType,
                message_content: content,
            },
        }),
        // 2. Update the conversation timestamp
        prisma.chatConversation.update({
            where: { id: conversationId },
            data: { last_message_at: new Date() },
        }),
    ]);

    return savedMessage;
};

/**
 * Retrieves all messages for a given conversation ID.
 */
export const getConversationHistory = async (conversationId) => {
    return prisma.chatMessage.findMany({
        where: { conversation_id: conversationId },
        orderBy: { created_at: 'desc' },
        take: 50, // Limit history size
    });
};