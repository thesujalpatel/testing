import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

import Landing from "../views/pages/Landing";
import Home from "../views/pages/Home";
import Admin from "../views/admin/Admin";
import NotFound from "../views/pages/NotFound";
import Auth from "../views/pages/Auth";

import AuthContext from "./context/authContext";
import AuthUserGuard from "./context/userContext";
import AuthAdminGuard from "./context/adminContext";

function Router() {
  const journalRoutes = [
    { path: "/", element: <Landing /> },
    {
      path: "/auth",
      element: <Auth />,
    },
  ];
  const userRoutes = [
    {
      path: "/home",
      element: <Home />,
    },
  ];
  const adminRoutes = [
    {
      path: "/admin",
      element: <Admin />,
    },
  ];
  const rout = createBrowserRouter(
    [
      ...journalRoutes,
      ...userRoutes.map((route) => ({
        ...route,
        element: <AuthUserGuard>{route.element}</AuthUserGuard>,
      })),
      ...adminRoutes.map((route) => ({
        ...route,
        element: <AuthAdminGuard>{route.element}</AuthAdminGuard>,
      })),
      { path: "*", element: <NotFound /> },
    ],
    {
      basename: "/testing",
    }
  );
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      ></ToastContainer>
      <AuthContext>
        <RouterProvider router={rout} />
      </AuthContext>
    </>
  );
}

export default Router;
