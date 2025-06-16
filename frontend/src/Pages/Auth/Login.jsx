import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";
import soccerBg from "../../assets/soccer-players-action-professional-stadium.jpg";


const Login = ({ setIsConnected }) => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(false),
    { t } = useTranslation(),
    navigate = useNavigate(),


    handleLogin = async (e) => {
      e.preventDefault();
      setError(false);

      try {
        const res = await axiosInstance.post("/users/login", {
          email,
          password,
        });

        console.log(res.data);


        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("name", res.data.data.name);
        sessionStorage.setItem("email", res.data.data.email);
        sessionStorage.setItem("phone", res.data.data.phone);
        sessionStorage.setItem("profile_picture", res.data.data.profile_picture);
        sessionStorage.setItem("userId", res.data.data._id);
        setIsConnected(true);

        navigate("/home");
      } catch (err) {
        console.error("Login failed:", err);
        setError(true);
      }
    };

  return (
    <div
      style={{
        backgroundImage: `url(${soccerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "background-image 0.3s ease"
      }}
    >
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white/90 p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01]">
          <div>
            <h1 className="text-4xl font-extrabold text-center text-indigo-700 tracking-tight">
              {t("Login")}
            </h1>
            <p className="mt-3 text-center text-gray-500 text-lg">
              {t("Welcome back! Please enter your details")}
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("Email Address")}
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder={t("Enter your email")}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("Password")}
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="password"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder={t("Enter your password")}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-center py-3 rounded-lg">
                {t("Invalid email or password")}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all hover:scale-[1.02]"
            >
              {t("Login")}
            </button>

            <div className="flex flex-col space-y-4 text-center">
              <Link
                to="/signup"
                className="text-indigo-600 font-medium transition-colors"
              >
                {t("Don't have an account? Sign Up")}
              </Link>
              <Link
                to="/forgot-password"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {t("Forgot Password?")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;