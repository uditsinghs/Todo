import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams(); // Task ID from route params
  const navigate = useNavigate(); // Navigation hook
  const [task, setTask] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch task details on component mount
  const getTask = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/todo/get/${id}`
      );
      if (data.success) {
        setTask(data.todo);
        setTaskData(data.todo); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching task");
    }
  };

  useEffect(() => {
    getTask();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Handle dropdown change
  const handleDropdownChange = (key, value) => {
    setTaskData({ ...taskData, [key]: value });
  };

  // Handle form submission to update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/todo/update/${id}`,
        taskData
      );
      if (data.success) {
        toast.success("Task updated successfully!");
        navigate(`/view/${id}`); // Navigate to view page after successful update
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) => handleDropdownChange("status", value)}
              defaultValue={taskData.status || "pending"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In-Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <Label>Priority</Label>
            <Select
              onValueChange={(value) => handleDropdownChange("priority", value)}
              defaultValue={taskData.priority || "medium"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={taskData.dueDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="text-center flex gap-4 items-center justify-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Link to={`/view/${id}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
