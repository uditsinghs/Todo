import { Button } from "@/components/ui/button"; // Replace with your button component path
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const TaskView = () => {
  const { id } = useParams(); // Get the task ID from the route
  const navigate = useNavigate(); // For navigation

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [task, setTask] = useState({});

  // Handle edit task navigation
  const handleEdit = () => {
    navigate(`/edit-task/${id}`); // Redirect to edit task page
  };

  const getTask = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/todo/get/${id}`
      );
      if (data.success) {
        setTask(data.todo);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, [id]);

  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/todo/delete/${id}`
      );
      if (data.success) {
        toast.success(data.message || "Task deleted successfully");
        navigate("/todos");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Link to="/todos">
          <Button>Cancel</Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Task Details
        </h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Title:</h2>
          <p className="text-gray-600">{task.title}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Description:</h2>
          <p className="text-gray-600">
            {task.description || "No description"}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Status:</h2>
          <p className="text-gray-600 capitalize">{task.status}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Priority:</h2>
          <p className="text-gray-600 capitalize">{task.priority}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Due Date:</h2>
          <p className="text-gray-600">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Task
          </Button>
          <Button
            onClick={() => deleteTask(task._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
