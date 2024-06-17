import { createBrowserRouter } from "react-router-dom";
import {  BROWSE_PATH, LOGIN_PATH } from "./paths";
import Login from "../auth/login";
import Browse from "../browse/Browse";

export const appRouter = createBrowserRouter([
  { path: LOGIN_PATH, element: <Login /> },
  { path: BROWSE_PATH, element: <Browse /> },
]);
