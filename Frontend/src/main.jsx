import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { todoApi } from "./features/apis/todoApi";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider api={todoApi}>
      <App />
    </ApiProvider>

    <Toaster />
  </StrictMode>
);
