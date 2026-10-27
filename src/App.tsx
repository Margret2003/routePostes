import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import LayOut from "./layOut/LayOut";
import Home from "./pages/home/Home";
import { Toast } from "@heroui/react";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./pages/profile/Profile";
import PostDetails from "./pages/PostDetails";
import AddPostComponent from "./components/AddPostComponent";

const QueryConfig = new QueryClient();

let x = createBrowserRouter([
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/addPost",
        element: (
          <ProtectedRoute>
            {" "}
            <AddPostComponent/>{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/postDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <PostDetails />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <QueryClientProvider client={QueryConfig}>
        <AuthContext>
          <Toast.Provider placement="top" />
          <RouterProvider router={x} />
        </AuthContext>
      </QueryClientProvider>
    </>
  );
}
