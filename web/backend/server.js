import express from "express";
import cors from "cors";
import env from "dotenv";

env.config();

const app = express();

app.use(express.json());
app.use(cors());
import authRoutes from './controllers/auth/auth.js';
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port :${PORT}`)
});