import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import EpisodePage from "./pages/EpisodePage.tsx";

const router = createBrowserRouter([
  {path: "/", element:<Home />},
  {path:"/episode/:id", element:<EpisodePage />}
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
