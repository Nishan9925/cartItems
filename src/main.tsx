import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
// import ItemsContainer from "./components/ItemsContainer.tsx";
// import Cart from "./components/Cart.tsx";
import { store } from "../src/store.ts";
import router from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <main className="main">
  <Provider store={store}>
    <RouterProvider router={router}/>
    <App />
  </Provider>
  </main>
);
