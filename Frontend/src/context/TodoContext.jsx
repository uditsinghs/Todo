/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

// Provider Component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Todos
  const getTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/todo/get");
      if (data.success) {
        setTodos(data.todos);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch todos");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, getTodos, loading, error }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom Hook
export const useTodo = () => {
  return useContext(TodoContext);
};
