import express from "express";
import {
  addTodo,
  getAllTodo,
  getTodoById,
  removeTodo,
  updateTodo,
} from "../controller/todo.controller.js";

const router = express.Router();
router.post("/create", addTodo);
router.get("/get", getAllTodo);
router.get("/get/:id", getTodoById);
router.delete("/delete/:id", removeTodo);
router.put("/update/:id", updateTodo);

export default router;
