import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../axios/axiosInstance";

const userNav = () => {
    const userName = sessionStorage.getItem("name") || "Guest";
    const profilePicture = sessionStorage.getItem("profile_picture");
    let Pic = "";
    if (profilePicture.includes("uploads")) {
        Pic = `http://localhost:5000/uploads/usersImages/${profilePicture.slice(8)}`;
    }
    else {
        Pic = `http://localhost:5000/${profilePicture.slice(9)}`;
    }
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
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
            navigate("/");
        }
    };
     const { t, i18n } = useTranslation();
     
      const handleLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
      };
    
      useEffect(() => {
        const lang = i18n.language;
        lang === "ar" ? (document.body.dir = "rtl") : "ltr";
        lang != "ar" ? (document.body.dir = "ltr") : "rtl";
      }, [i18n.language]);
    

    return (
        <nav className="flex justify-between items-center bg-green-600 p-3 text-white shadow-md">
            <div className="flex items-center gap-2 text-xl font-extrabold">
                <FontAwesomeIcon
                    icon={faFutbol}
                    size="lg"
                    style={{ color: "white" }}
                />
                <Link to="/" className="text-white no-underline">
                    MatchUp
                </Link>
            </div>
            <ul className="hidden md:flex items-center justify-center gap-10 ml-8">
                <li>
                    <Link
                        to="/"
                        className="font-bold text-white text-lg transition-colors duration-300 hover:border-b-2 hover:border-white focus:border-b-2 focus:border-white"
                    >
                        {t("Home")}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard/create-match"
                        className="font-bold text-white text-lg transition-colors duration-300 hover:border-b-2 hover:border-white"
                    >
                        {t("Create match")}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/services"
                        className="font-bold text-white text-lg transition-colors duration-300 hover:border-b-2 hover:border-white"
                    >
                        Services
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact"
                        className="font-bold text-white text-lg transition-colors duration-300 hover:border-b-2 hover:border-white"
                    >
                        Contact
                    </Link>
                </li>
            </ul>
            <div className="relative">
                <div
                    className="flex items-center cursor-pointer ml-90"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <img
                        src={Pic}
                        alt="Profile"
                        loading="lazy"
                        className="w-10 h-10 rounded-full shadow-md mr-2"
                    />
                    <span className="font-bold">{userName}</span>
                </div>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-4 hover:bg-green-600">
                        <div
                            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                            onClick={() => navigate("/profile")}
                        >
                            Profile
                        </div>
                        <div
                            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </div>
                )}
            </div>
            <div>
          <label htmlFor="language"></label>
          <select
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 bg-white focus:ring-green-600 text-black"
            value={i18n.language}
            id="language"
            onChange={handleLanguage}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
          </select>
        </div>
        </nav>
    );
};
export default userNav;