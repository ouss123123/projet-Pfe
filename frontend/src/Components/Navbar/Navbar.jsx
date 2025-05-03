import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const lang = i18n.language;
    lang === "ar" ? (document.body.dir = "rtl") : "ltr";
  }, [i18n.language]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FontAwesomeIcon
          icon={faFutbol}
          size="lg"
          style={{ color: "#4caf50" }}
        />{" "}
        <Link to="/">{t("TeamUpPlay")}</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">{t("Home")}</Link>
        </li>
        <li>
          <Link to="/about">{t("About")}</Link>
        </li>
        <li>
          <Link to="/services">{t("Services")}</Link>
        </li>
        <li>
          <Link to="/contact">{t("Contact")}</Link>
        </li>
      </ul>
      <ul className="navbar-auth-links">
        <li className="login-btn">
          <Link to="/login">{t("Login")}</Link>
        </li>
        <li className="signup-btn">
          <Link to="/signup">{t("Signup")}</Link>
        </li>
      </ul>
      <select onChange={handleLanguage}>
        <option value="fr">fr</option>
        <option value="ar">ar</option>
        <option value="en">en</option>
      </select>
    </nav>
  );
};

export default Navbar;
