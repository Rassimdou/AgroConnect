import express from "express";
import cors from "cors";
import env from "dotenv";
import productRoutes from './market/product.routes.js';


env.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port :${PORT}`)
});