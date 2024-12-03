import { Todo } from "../model/todo.model.js";
export const addTodo = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(200).json({
      message: "Task added",
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};

export const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    if (todos.length === 0) { 
      return res.status(200).json({
        message: "No task added",
        succes: true,
      });
    }
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        message: "No todo found.",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updatedData = { title, description, status, priority, dueDate };
    const todo = await Todo.findByIdAndUpdate(id, updatedData, { new: true });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "No todo found.",
      });
    }

    res.status(200).json({
      success: true,
      todo,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};
