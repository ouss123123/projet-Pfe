import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateMatch = () => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        date: "",
        time: "",
        maxPlayers: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = sessionStorage.getItem("token"); // Get the token from sessionStorage
            const response = await axios.post(
                "http://localhost:5000/matches", // Replace with your backend endpoint
                {
                    ...formData,
                    players: [], // Initialize players as an empty array
                    createdBy: sessionStorage.getItem("userId"), // Set the creator's name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token for authentication
                    },
                }
            );

            console.log(response.data);
            alert("Match created successfully!");
            navigate("/create-matche"); // Redirect to matches page after creation
        } catch (err) {
            console.error(err);
            setError("Failed to create match. Please try again.");
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Create a Match</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        {t("Title")}
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                        {t("Location")}
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                        {t("Date")}
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                        {t("Time")}
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="maxPlayers" className="block text-gray-700 font-medium mb-2">
                        {t("Maximum Players")}
                    </label>
                    <input
                        type="number"
                        id="maxPlayers"
                        name="maxPlayers"
                        value={formData.maxPlayers}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {t("Create Match")}
                </button>
            </form>
        </div>
    );
};

export default CreateMatch;