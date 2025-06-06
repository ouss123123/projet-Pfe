import { lazy, useState } from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home/Home"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const Dashboard = lazy(() => import("./Pages/Dashboard/dashboard"));
const CreateMatch = lazy(() => import("./Pages/Matches/CreateMatch"));
const ResetPassword = lazy(() => import("./Pages/Auth/ResetPassword"));
const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const MatchDetails = lazy(() => import("./pages/matches/MatchDetails"));
const Chat = lazy(() => import("./Pages/Chat/Chat"));

function App() {
  const [IsConnected, setIsConnected] = useState(false);
  return (
    <BrowserRouter>
      <Suspense >
        <Routes>
          <Route path="/" element={<Home setIsConnected={setIsConnected} />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login  setIsConnected={setIsConnected}/>} />
          <Route path="/dashboard" element={<Dashboard  setIsConnected={setIsConnected}/>}/>
          <Route path="/create-match" element={<CreateMatch setIsConnected={setIsConnected} />} />
          <Route path="/profile" element={<Profile setIsConnected={setIsConnected} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/matches/:id" element={<MatchDetails />} />
          <Route path="/reset" element={<ResetPassword/>} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
