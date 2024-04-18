import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-left" />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
