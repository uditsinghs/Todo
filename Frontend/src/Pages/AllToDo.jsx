import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Loader } from "lucide-react";
import { useTodo } from "@/context/TodoContext";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const AllToDo = () => {
  const navigate = useNavigate();
  const { todos, getTodos, loading, error } = useTodo();

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
            All Tasks
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 border border-gray-300">Task Title</th>
                  <th className="p-4 border border-gray-300">Due Date</th>
                  <th className="p-4 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos?.length > 0 ? (
                  todos?.map((task) => (
                    <tr key={task._id} className="hover:bg-gray-100">
                      <td className="p-4 border border-gray-300 relative">
                        {task.title}
                        <Badge size="sm" className="absolute top-0">
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="p-4 border border-gray-300">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 border border-gray-300">
                        <Link to={`/view/${task._id}`}>
                          <Button variant="outline" className="mr-2">
                            <Eye />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-4 text-center text-gray-500 border border-gray-300"
                    >
                      No tasks available. Create a new task!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <Button
              variant="primary"
              onClick={() => navigate("/")}
              className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add New Task
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllToDo;
