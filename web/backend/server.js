import express from "express";
import cors from "cors";
import env from "dotenv";

env.config();

const app = express();

app.use(express.json());
app.use(cors());
import authRoutes from './controllers/auth/auth.js';
import aiRoutes from './AI-verification/airoutes.js'
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port :${PORT}`)
});