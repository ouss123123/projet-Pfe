import React, { use } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";
import logo from "../../assets/react.svg";

const Navbar = () => {
  const [arrow, SetArrow] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const token = sessionStorage.getItem("token");
  const profilePicture = sessionStorage.getItem("profile_picture");
  let Pic = "";
  if (profilePicture?.includes("uploads")) {
    Pic = `http://localhost:5000/uploads/usersImages/${profilePicture?.slice(
      8
    )}`;
  } else {
    Pic = `http://localhost:5000/${profilePicture?.slice(9)}`;
  }

  const handleLogOut = async () => {
    try {
      await axiosInstance.post(
        "/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const lang = i18n.language;
    lang === "ar" ? (document.body.dir = "rtl") : "ltr";
    lang != "ar" ? (document.body.dir = "ltr") : "rtl";
  }, [i18n.language]);

  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md px-10 py-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
      </div>
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link
            to="/"
            className={`hover:text-blue-600 transition-colors ${
              location.pathname === "/"
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            {t("Home")}
          </Link>
        </li>
        <li>
          <Link
            to="/explore"
            className={`hover:text-blue-600 transition-colors ${
              location.pathname === "/explore"
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            {t("Explore")}
          </Link>
        </li>
        <li>
          <Link
            to="/properties"
            className={`hover:text-blue-600 transition-colors ${
              location.pathname === "/properties"
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            {t("Properties")}
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`hover:text-blue-600 transition-colors ${
              location.pathname === "/about"
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            {t("About")}
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`hover:text-blue-600 transition-colors ${
              location.pathname === "/contact"
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            {t("Contact")}
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        {!token ? (
          <>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
            >
              {t("Sign Up")}
            </Link>
            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
            >
              {t("Login")}
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            {profilePicture && (
              <img
                src={Pic}
                alt="Profile"
                loading="lazy"
                className="w-10 h-10 rounded-full object-cover shadow-md"
              />
            )}
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              onClick={handleLogOut}
              aria-label="Logout"
            >
              {t("Logout")}
            </button>
            <button
              aria-label="Wishlist"
              onClick={() => SetArrow(!arrow)}
              className="relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <path
                  d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {arrow && (
              <div className="absolute top-18 right-40 z-5 bg-white shadow-lg p-4 rounded-lg">
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-blue-600 mb-2"
                >
                  {t("Profile")}
                </Link>
                <Link
                  to="/settings"
                  className="block text-gray-700 hover:text-blue-600 mb-2"
                >
                  {t("Settings")}
                </Link>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  {t("Logout")}
                </Link>
              </div>
            )}
          </div>
        )}
        <div>
          <label htmlFor="language"></label>
          <select
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={i18n.language}
            id="language"
            onChange={handleLanguage}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
