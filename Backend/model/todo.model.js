import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], // Task statuses
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // Priority levels
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
