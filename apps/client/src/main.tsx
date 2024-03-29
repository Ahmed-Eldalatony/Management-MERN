import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Container from "./components/Container.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import LogIn from "./pages/LogIn.tsx";
import Header from "./components/Header.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Container bg="bg-slate-900 text-white">
      <Header />
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);
