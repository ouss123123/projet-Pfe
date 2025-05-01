import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(false),
    { t } = useTranslation(),
    navigate = useNavigate(),
    handleLogin = async (e) => {
      e.preventDefault();
      setError(false);

      try {
        const res = await axiosInstance.post("/login", {
          email,
          password,
        });

        sessionStorage.setItem("token", res.data.token);

        navigate("/");
      } catch (err) {
        console.error("Login failed:", err);
        setError(true);
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {t("Login")}
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Email Address")}
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={t("Enter your email")}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Password")}
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={t("Enter your password")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105"
          >
            {t("Login")}
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {t("Invalid email or password")}
          </div>
        )}
        <div className="">
          <div className="text-center mt-4">
            <Link
              to="/sign-up"
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              {t("Don't have an account? Sign Up")}
            </Link>
          </div>
          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              {t("Forgot Password?")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;