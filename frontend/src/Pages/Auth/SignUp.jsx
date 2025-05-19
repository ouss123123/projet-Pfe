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
  { t } = useTranslation(),
    [base64Image, setBase64Image] = useState(""),
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
    handleSignup = async (e) => {
      e.preventDefault();
      try {
        axiosInstance
          .post("/users", {
            name: signUp.name,
            email: signUp.email,
            phone: signUp.phone,
            password: signUp.password,
            avatar: signUp.profile_picture,
          })
          .then(() => {
            navigate("/login");
          });
      } catch (a) {
        console.log(a);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01]">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("Sign Up")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("Create your account and start exploring")}
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Full Name")}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder={t("Enter your full name")}
                  onChange={(e) =>
                    setSignUp({ ...signUp, name: e.target.value })
                  }
                />
              </div>
            </div>

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
                  onChange={(e) =>
                    setSignUp({ ...signUp, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Phone Number")}
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="phone"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder={t("Enter your phone number")}
                  onChange={(e) =>
                    setSignUp({ ...signUp, phone: e.target.value })
                  }
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
                  placeholder={t("Create a password")}
                  onChange={(e) =>
                    setSignUp({ ...signUp, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profile_picture"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Profile Picture")}
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  id="profile_picture"
                  accept="image/*"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  onChange={handleImageInput}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all hover:scale-[1.02]"
          >
            {t("Sign Up")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
