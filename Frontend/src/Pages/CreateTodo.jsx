import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAddTodoMutation } from "@/features/apis/todoApi";

const CreateTodo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
  });

  const [addTodo, { data, isSuccess, isLoading, error, isError }] =
    useAddTodoMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAddTodo = async () => {
    await addTodo(formData);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message || "Task Added");
      navigate('/todos')
    }
    if (isError && error) {
      toast.error(error?.response?.data.message || "Error in added task");
    }
  }, [error, isError, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <Button
          variant="link"
          className="mb-4"
          onClick={() => navigate("/todos")}
        >
          View All Tasks
        </Button>
        <h1 className="text-2xl font-bold text-center mb-6">Create Task</h1>
        <form className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) => handleDropdownChange("status", value)}
              defaultValue={formData.status || "pending"}
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
              defaultValue={formData.priority || "medium"}
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
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              onClick={handleAddTodo}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                "Create Task"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
