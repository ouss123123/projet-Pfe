import { useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import soccerbg from "../../assets/soccer-players-action-professional-stadium.jpg";
const SignUp = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    profile_picture: "",
  });
  const { t } = useTranslation();
  const [base64Image, setBase64Image] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleImageInput = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Image(reader.result);
      setPreview(reader.result);
      setSignUp({ ...signUp, profile_picture: reader.result });
    };
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/users", {
        name: signUp.name,
        email: signUp.email,
        phone: signUp.phone,
        password: signUp.password,
        avatar: signUp.profile_picture,
      });
      navigate("/login");
    } catch (a) {
      console.log(a);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] to-[#f3e8ff]"
      style={{
        background: `linear-gradient(to bottom right, #e0e7ff, #f3e8ff)`,
        backgroundImage: `url(${soccerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "background-image 0.3s ease"
      }}
    >
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl border border-gray-200 p-8 sm:p-12 flex flex-col items-center backdrop-blur-md">
        <div className="mb-8 flex flex-col items-center">
          <FontAwesomeIcon icon={faFutbol} className="text-4xl text-indigo-700 mb-2" />
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-1 tracking-tight">
            {t("Create Account")}
          </h1>
          <p className="text-gray-500 text-base">
            {t("Sign up to get started with our platform")}
          </p>
        </div>
        <form onSubmit={handleSignup} className="w-full space-y-6">
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("Full Name")}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder={t("Enter your full name")}
                onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("Email Address")}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder={t("Enter your email")}
                onChange={(e) =>
                  setSignUp({ ...signUp, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("Phone Number")}
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder={t("Enter your phone number")}
                onChange={(e) =>
                  setSignUp({ ...signUp, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("Password")}
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder={t("Create a password")}
                onChange={(e) =>
                  setSignUp({ ...signUp, password: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="profile_picture"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("Profile Picture")}
              </label>
              <input
                type="file"
                id="profile_picture"
                accept="image/*"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                onChange={handleImageInput}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.02]"
          >
            {t("Sign Up")}
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-500">
          {t("Already have an account?")}{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            {t("Login")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;