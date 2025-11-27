import express from "express";
import cors from "cors";
import env from "dotenv";

env.config();

const app = express();

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port :${PORT}`)
});