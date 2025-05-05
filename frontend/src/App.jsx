import { lazy } from "react";
import { Suspense } from "react";
import Spinner from "./Components/Loading/Spinner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Pages/Pages/Home"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const Dashboard = lazy(() => import("./Pages/Pages/dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
