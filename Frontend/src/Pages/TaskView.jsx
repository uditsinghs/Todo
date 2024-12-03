import { Button } from "@/components/ui/button";
import { useDeleteTodoMutation, useGetSingletaskQuery } from "@/features/apis/todoApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const TaskView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: getTaskIsLoading, error } = useGetSingletaskQuery(id);
  const [deleteTodo, { isLoading: deleteIsLoading, isSuccess }] = useDeleteTodoMutation();
  const { todo } = data || {};

  useEffect(() => {
    if (!id) {
      toast.error("Invalid Task ID");
      navigate("/todos");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task deleted successfully");
      navigate("/todos");
    }
  }, [isSuccess, navigate]);

  const deleteTask = () => {
    deleteTodo(id);
  };

  if (error) {
    return <p>{error?.data?.message || "An error occurred while fetching the task."}</p>;
  }

  if (getTaskIsLoading) return <Loader2 className="animate-spin" />;

  if (!todo) return <p>No task data found.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Link to="/todos">
          <Button className="mb-4">Cancel</Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Task Details</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Title:</h2>
          <p className="text-gray-600">{todo?.title || "No title available"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Description:</h2>
          <p className="text-gray-600">{todo?.description || "No description available"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Status:</h2>
          <p className="text-gray-600 capitalize">{todo?.status || "Unknown"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Priority:</h2>
          <p className="text-gray-600 capitalize">{todo?.priority || "Not set"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Due Date:</h2>
          <p className="text-gray-600">
            {todo?.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No due date"}
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate(`/edit-task/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Task
          </Button>
          <Button
            onClick={deleteTask}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              "Delete Task"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
