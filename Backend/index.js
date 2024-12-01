import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./Db/db.js";
import todoRouter from './routes/todo.route.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.use('/api/v1/todo',todoRouter)
connectDB();
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT} port`);
});
