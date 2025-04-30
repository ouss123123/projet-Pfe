import { useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
      name: "",
      phone: "",
      email: "",
      password: "",
      profile_picture: "",
    }),
    [base64Image, setBase64Image] = useState(""),
    { t } = useTranslation(),
    handleImageInput = (e) => {
      let a = e.target.files[0],
        p = new FileReader();
      p.readAsDataURL(a),
        (p.onloadend = () => {
          setBase64Image(p.result),
            setSignUp({ ...signUp, profile_picture: p.result });
        });
    },
    navigate = useNavigate(),
    handleSignup = (e) => {
      e.preventDefault();
      try {
        axiosInstance.post("/register", {
          name: signUp.name,
          email: signUp.email,
          phone: signUp.phone,
          password: signUp.password,
          profile_picture: signUp.profile_picture,
        });
        
      } catch (a) {
        console.log(a);
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen m-5">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {t("Sign Up")}
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Full Name")}
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder={t("Enter your full name")}
              onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Email Address")}
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder={t("Enter your email")}
              onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Phone Number")}
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder={t("Enter your phone number")}
              onChange={(e) => setSignUp({ ...signUp, phone: e.target.value })}
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
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder={t("Create a password")}
              onChange={(e) =>
                setSignUp({ ...signUp, password: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="profile_picture"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Profile Picture")}
            </label>
            <input
              type="file"
              id="profile_picture"
              className="w-full px-4 py-3 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleImageInput}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105"
          >
            {t("Sign Up")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;