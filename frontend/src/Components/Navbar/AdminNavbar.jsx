import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Property.webp";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";

const AdminNavbar = () => {
  const [arrow, SetArrow] = useState(false);
  const { t, i18n } = useTranslation();
  const token = sessionStorage.getItem("token");
  const profilePicture = localStorage.getItem("profilePicture");

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
  }, [i18n.language]);

  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md px-10 py-2">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
      </div>
      <ul className="flex space-x-8 text-lg font-{font-poppins}">
        <li>
          <Link to="/" className="">
            {t("Home")}
          </Link>
        </li>
        <li>
          <Link to="/explore" className="">
            {t("Explore")}
          </Link>
        </li>
        <li>
          <Link to="/properties" className="">
            {t("Properties")}
          </Link>
        </li>
        <li>
          <Link to="/about" className="">
            {t("About")}
          </Link>
        </li>
        <li>
          <Link to="/contact" className="">
            {t("Contact")}
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-6">
        {!token ? (
          <>
            <Link
              to="/sign-up"
              className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
            >
              {t("Sign Up")}
            </Link>
            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
            >
              {t("Login")}
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            {profilePicture && (
              <img
                src={`http://localhost:8000/storage/images/${profilePicture}`}
                alt={t("Profile")}
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
            )}
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              onClick={handleLogOut}
              aria-label="logout"
            >
              {t("Logout")}
            </button>
            <button aria-label="arrow" onClick={() => SetArrow(!arrow)}>
              <svg
                className="translate-x-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
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
            <div className="z-10 relative">
              {arrow && (
                <div className="absolute top-7 right-0">
                  <div className="bg-gray-50 shadow-md p-4 border-1 border-gray-200 px-4">
                    <Link
                      to="/add"
                      className="flex justify-start text-start px-4 hover:text-blue-600"
                    >
                      {t("Add")}
                    </Link>
                  </div>
                  <div className="bg-gray-50 shadow-md p-4 border-1 border-gray-200 px-4">
                    <Link
                      to="/users"
                      className="flex justify-start text-start px-4 hover:text-blue-600"
                    >
                      {t("Users")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label for="language"></label>
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
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;