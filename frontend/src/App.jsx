import { lazy } from "react";
import { Suspense } from "react";
import Spinner from "./Components/Loading/Spinner";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home/Home"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
