import express from "express";
import cors from "cors";
import env from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './market/product.routes.js';
import { initialize as initializeChat } from './chat-system/chat.controller.js';
import authRoutes from './controllers/auth/auth.js';
import aiRoutes from './AI-verification/airoutes.js';
import reviewRoutes from './review/reviewRoutes.js';
import chatRoutes from './chat-system/chat.routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();

const app = express();

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());

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
    allowEIO3: true,
});

// Initialize the Chat System
initializeChat(io);

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;

// The HTTP server now listens, and Socket.IO traffic uses the same port
httpServer.listen(PORT, () => {
    console.log(`Express server running on port :${PORT}`);
    console.log(`Socket.IO server active.`);
});