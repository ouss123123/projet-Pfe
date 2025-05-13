import { lazy } from "react";
import { Suspense } from "react";
import Spinner from "./Components/Loading/Spinner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home/Home"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const Dashboard = lazy(() => import("./Pages/Dashboard/dashboard"));
const CreateMatch = lazy(() => import("./Pages/Matches/CreateMatch"));
const ResetPassword = lazy(() => import("./Pages/Auth/ResetPassword"));
const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/create-match" element={<CreateMatch />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
