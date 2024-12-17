import { createBrowserRouter } from "react-router-dom";
import ItemsContainer from "../components/ItemsContainer";
import Cart from "../components/Cart";
import ErrorComponent from "../components/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ItemsContainer />,
    errorElement: <ErrorComponent/>,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorComponent/>,
  },
]);

export default router;