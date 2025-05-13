import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/react.svg";

const Navbar = () => {
    const [arrow, SetArrow] = useState(false);
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
        <div className="w-full flex justify-between items-center bg-white shadow-md px-10 py-4">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
            </div>
            <ul className="flex space-x-6 text-lg font-medium">
                <li>
                    <Link
                        to="/"
                        className={`hover:text-blue-600 transition-colors ${location.pathname === "/"
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
                        className={`hover:text-blue-600 transition-colors ${location.pathname === "/explore"
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
                        className={`hover:text-blue-600 transition-colors ${location.pathname === "/properties"
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
                        className={`hover:text-blue-600 transition-colors ${location.pathname === "/about"
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
                        className={`hover:text-blue-600 transition-colors ${location.pathname === "/contact"
                            ? "text-blue-600 font-semibold"
                            : "text-gray-700"
                            }`}
                    >
                        {t("Contact")}
                    </Link>
                </li>
            </ul>
            <div className="flex items-center space-x-4">
                <Link
                    to="/sign-up"
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
