import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faUser, faSignOutAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const UserNav = () => {
    const userName = sessionStorage.getItem("name") || "Guest";
    const token = sessionStorage.getItem("token") || null;
    const profilePicture = sessionStorage.getItem("profile_picture");
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();

    let Pic = "";
    if (profilePicture?.includes("uploads")) {
        Pic = `http://localhost:5000/uploads/usersImages/${profilePicture.slice(8)}`;
    } else if (profilePicture) {
        Pic = `http://localhost:5000/${profilePicture.slice(9)}`;
    }

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    };

    const handleLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    useEffect(() => {
        const lang = i18n.language;
        document.body.dir = lang === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);

    return (
        <nav
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 w-full text-white shadow-lg fixed top-0 left-0 z-[1000]"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div
                    className="flex items-center gap-3"
                >
                    <FontAwesomeIcon
                        icon={faFutbol}
                        className="text-2xl"
                    />
                    <Link to="/dashboard" className="text-2xl font-bold hover:text-blue-100 transition-colors">
                        MatchUp
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {[
                        { path: "/dashboard", label: t("Home") },
                        { path: "/create-match", label: t("Create match") },
                        { path: "/services", label: "Services" },
                        { path: "/contact", label: "Contact" }
                    ].map((link) => (
                        <div
                            key={link.path}
                            className="flex items-center space-x-2"
                        >
                            <Link
                                to={link.path}
                                className="text-lg font-semibold hover:text-blue-100 transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* User Section */}
                <div className="flex items-center gap-6">
                    {/* Language Selector */}
                    <div
                        className="relative"
                    >
                        <FontAwesomeIcon icon={faGlobe} className="text-xl mr-2" />
                        <select
                            className="bg-transparent border border-white/30 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                            value={i18n.language}
                            onChange={handleLanguage}
                        >
                            <option value="en" className="bg-blue-600">English</option>
                            <option value="ar" className="bg-blue-600">العربية</option>
                            <option value="fr" className="bg-blue-600">Français</option>
                        </select>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <div
                            className="flex items-center gap-3 cursor-pointer bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <img
                                src={Pic}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-white/50"
                            />
                            <span className="font-semibold">{userName}</span>
                        </div>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden"
                                >
                                    <div className="py-1">
                                        <button
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                            onClick={() => {
                                                navigate("/profile");
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faUser} />
                                            Profile
                                        </button>
                                        <button
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                            onClick={handleLogout}
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNav;