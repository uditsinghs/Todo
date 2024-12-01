import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllToDo from "./Pages/AllToDo";
import CreateTodo from "./Pages/CreateTodo";
import TaskView from "./Pages/TaskView";
import EditTask from "./Pages/EditTask";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for CreateTodo */}
        <Route path="/" element={<CreateTodo />} />

        {/* Route for AllToDo */}
        <Route path="/todos" element={<AllToDo />} />

        {/* Route for TaskView */}
        <Route path="/view/:id" element={<TaskView />} />
        {/* Route fro EditTask */}
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
