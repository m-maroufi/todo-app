import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { AuthProvider } from "./hooks/useAuth";
import { TaskProvider } from "./hooks/useTasks";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <TaskProvider>
          <ToastContainer
            rtl
            bodyStyle={{ fontFamily: "'Vazirmatn', sans-serif" }}
          />

          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path={"/home"} element={<Home />}></Route>
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
