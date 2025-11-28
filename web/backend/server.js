import express from "express";
import cors from "cors";
import env from "dotenv";
import { createServer } from "http"; // 1. Import http server
import { Server } from "socket.io";  // 2. Import Socket.IO Server

import productRoutes from './market/product.routes.js';
import { initialize as initializeChat } from './chat-system/chat.controller.js'; // ✅ CORRECT // 3. Import chat initializer

env.config();

const app = express();


app.use(express.json());

import authRoutes from './controllers/auth/auth.js';
import aiRoutes from './AI-verification/airoutes.js';
import reviewRoutes from './review/reviewRoutes.js';

// cors for both express and socket.io
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use('/api', productRoutes);


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
    // Allows clients to send auth data during connection handshake
    allowEIO3: true,
});

// 5. Initialize the Chat System
// This sets up the authentication middleware and all 'on connection' event handlers
initializeChat(io);

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/review', reviewRoutes)
const PORT = process.env.PORT || 3000;

// The HTTP server now listens, and Socket.IO traffic uses the same port
httpServer.listen(PORT, () => {
    console.log(`Express server running on port :${PORT}`);
    console.log(`Socket.IO server active.`);
});