import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Registration from "../pages/Authentication/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <h1>Hello Mom</h1>,
      },
      {
        path: "/registration",
        element:<Registration/>
      },
    ],
  },
]);


export default router;