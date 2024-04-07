import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;