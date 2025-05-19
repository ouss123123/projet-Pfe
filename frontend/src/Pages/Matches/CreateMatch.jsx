import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Map from "../../Components/Map/Map";
import UserNav from "../../Components/Navbar/userNav";
import axiosInstance from "../../axios/axiosInstance";

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

    const [stadiums, setStadium] = useState([]);
    const [selectedStadium, setSelectedStadium] = useState({});
    const token = sessionStorage.getItem("token"); // Get the token from sessionStorage
    const getStadiums = async () => {
        try {
            const response = await axiosInstance.get(
                "/stadiums",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStadium(response.data.data);
            console.log(response.data.data);    
        } catch (error) {
            console.error("Error fetching stadiums", error);
        }
        console.log(token);
    };
    useEffect(() => { 
        getStadiums();
    }, []);
            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
                const stadiumSelect = e.target.value;
                stadiums.find((stadium) => stadium.name == stadiumSelect && setSelectedStadium({lat: stadium.location.latitude, lng: stadium.location.longitude}));
            };
            console.log(selectedStadium);

            const handleSubmit = async (e) => {
                e.preventDefault();
                setError("");

                try {
                    const token = sessionStorage.getItem("token"); // Get the token from sessionStorage
                    const response = await axiosInstance.post(
                        "/matches", // Replace with your backend endpoint
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
                    // Navigate to match details page with the new match ID
                    navigate(`/matches/${response.data.data._id}`); // assuming response.data.data._id is the match ID
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
                <>
                    {/* Main Content */}
                    <UserNav/>
                    <div className="container mx-auto mt-20">
                        {/* Grid layout for form and map */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column: Form */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
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
                                        <select
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                        >
                                            <option value="" disabled>
                                                {t("Select a stadium")}
                                            </option>
                                            {stadiums.map((stadium) => (
                                                <option key={stadium._id} value={stadium.name}>
                                                    {stadium.name}
                                                </option>
                                            ))}
                                        </select>
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
                                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                                    >
                                        {t("Create Match")}
                                    </button>
                                </form>
                            </div>
            
                            {/* Right Column: Map */}
                            <div className="bg-white p-0 rounded-lg shadow-md">
                                <div className="h-100">
                                    <Map lat={selectedStadium?.lat} lng={selectedStadium?.lng} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        };

        export default CreateMatch;