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
import {
  useGetSingletaskQuery,
  useUpdateTodoMutation,
} from "@/features/apis/todoApi";
import { Loader2 } from "lucide-react";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
  });

  const { data, isLoading: getTaskIsLoading, error,refetch } = useGetSingletaskQuery(id);
  const [updateTodo, { isLoading, isSuccess, error: updateError }] = useUpdateTodoMutation();
  const { todo } = data || {};

  useEffect(() => {
    if (!id) {
      toast.error("Invalid Task ID");
      navigate("/todos");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (todo) {
      setTaskData({
        title: todo.title || "",
        description: todo.description || "",
        status: todo.status || "pending",
        priority: todo.priority || "medium",
        dueDate: todo.dueDate || "",
      });
    }
  }, [todo]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task updated successfully");
      navigate(`/view/${id}`);
      refetch()
    }
  }, [isSuccess, navigate, id,refetch]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError?.data?.message || "Failed to update task");
    }
  }, [updateError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleDropdownChange = (key, value) => {
    setTaskData({ ...taskData, [key]: value });
  };

  const handleUpdate = () => {
    if (!taskData.title || !taskData.status) {
      toast.error("Title and Status are required");
      return;
    }
    updateTodo({ id, data: taskData });
  };

  if (getTaskIsLoading) return <Loader2 className="animate-spin" />;

  if (error) {
    return <p>{error?.data?.message || "An error occurred while fetching the task."}</p>;
  }

  if (!todo) return <p>No task data found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Task</h1>
        <form className="space-y-4">
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
          <div className="text-center flex gap-4 items-center justify-center">
            <Button onClick={handleUpdate} disabled={isLoading}>
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
