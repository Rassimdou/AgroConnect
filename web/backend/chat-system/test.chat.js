// interactive-chat.js - Interactive chat testing
import { io } from 'socket.io-client';
import readline from 'readline';

// Get user info from command line arguments
const userId = process.argv[2] || '101';
const userType = process.argv[3] || 'user';
const targetId = process.argv[4] || '202';
const targetType = process.argv[5] || 'producer';

console.log('🚀 Interactive Chat Test');
console.log(`   You: ${userType}-${userId}`);
console.log(`   Chatting with: ${targetType}-${targetId}`);
console.log('   Type messages and press Enter to send');
console.log('   Type "exit" to quit\n');

const socket = io('http://localhost:3000', {
    query: {
        testId: userId,
        testType: userType
    },
    transports: ['websocket']
});

// Setup readline for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

socket.on('connect', () => {
    console.log(`✅ Connected as ${userType}-${userId}\n`);
    
    socket.emit('join_conversation', {
        targetId: parseInt(targetId),
        targetType: targetType
    });
});

socket.on('conversationHistory', (data) => {
    console.log(`📜 Loaded conversation #${data.conversationId}`);
    
    if (data.messages.length > 0) {
        console.log(`\n--- Previous Messages (${data.messages.length}) ---`);
        data.messages.slice(-10).forEach(msg => {
            const time = new Date(msg.created_at).toLocaleTimeString();
            const sender = `${msg.sender_type}-${msg.sender_id}`;
            const isYou = msg.sender_id == userId && msg.sender_type === userType;
            console.log(`[${time}] ${isYou ? 'You' : sender}: ${msg.message_content}`);
        });
        console.log('--- End of History ---\n');
    }
    
    console.log('💬 Chat is ready! Type your messages below:\n');
    rl.prompt();
});

socket.on('receiveMessage', (message) => {
    const time = new Date(message.created_at).toLocaleTimeString();
    const isYou = message.sender_id == userId && message.sender_type === userType;
    
    if (!isYou) {
        // Clear current line and show message
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(`[${time}] ${message.sender_type}-${message.sender_id}: ${message.message_content}`);
        rl.prompt();
    }
});

socket.on('chatError', (error) => {
    console.error('\n⚠️  Error:', error.message);
    rl.prompt();
});

socket.on('disconnect', () => {
    console.log('\n🔌 Disconnected from server');
    rl.close();
    process.exit(0);
});

socket.on('connect_error', (error) => {
    console.error('❌ Connection error:', error.message);
    rl.close();
    process.exit(1);
});

// Handle user input
rl.on('line', (input) => {
    const message = input.trim();
    
    if (message.toLowerCase() === 'exit') {
        console.log('👋 Goodbye!');
        socket.close();
        rl.close();
        process.exit(0);
    }
    
    if (message) {
        socket.emit('sendMessage', { content: message });
    }
    
    rl.prompt();
});

rl.on('close', () => {
    socket.close();
    process.exit(0);
});