import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../axios/axiosInstance";

const userNav = () => {
    const userName = sessionStorage.getItem("name") || "Guest";
    const token = sessionStorage.getItem("token") || null;
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

    const handleLogout =  () => {
            sessionStorage.clear();
            localStorage.clear();
            navigate("/");
        
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
        <nav className="bg-green-600 p-2 w-full text-white z-50000 shadow-md fixed top-0 left-0 ">
            {/* Wrapper for Navbar Content */}
            <div className="flex justify-between items-center">
                {/* Left Section */}
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
    
                {/* Center Section */}
                <ul className="hidden md:flex items-center justify-center gap-10 ml-8">
                    <li>
                        <Link
                            to="/dashboard"
                            className="font-bold text-white text-lg transition-colors duration-300 hover:border-b-2 hover:border-white focus:border-b-2 focus:border-white"
                        >
                            {t("Home")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/create-match"
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
    
                {/* Right Section */}
                <div className="relative flex items-center gap-4">
                    {/* Dropdown */}
                    <div
                        className="flex items-center cursor-pointer hover:bg-green-700 rounded-lg p-2"
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
                        <div className="absolute mt-43 w-48 bg-white text-black shadow-lg rounded-lg p-4 z-500">
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
    
                    {/* Language Selector */}
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
                </div>
            </div>
        </nav>
    );
};
export default userNav;