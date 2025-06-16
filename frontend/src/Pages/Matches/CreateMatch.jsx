import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Map from "../../Components/Map/Map";
import UserNav from "../../Components/Navbar/userNav";
import axiosInstance from "../../axios/axiosInstance";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const CreateMatch = React.memo(() => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        date: "",
        time: "",
        maxPlayers: "",
        price: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [stadiums, setStadium] = useState([]);
    const [selectedStadium, setSelectedStadium] = useState({});
    const token = sessionStorage.getItem("token");

    const getStadiums = async () => {
        try {
            const response = await axiosInstance.get(
                "/stadiums",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStadium(response.data.data);
        } catch (error) {
            console.error("Error fetching stadiums", error);
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axiosInstance.post(
                "/matches",
                {
                    ...formData,
                    players: [],
                    createdBy: sessionStorage.getItem("userId"),
                    stadiumLocation: selectedStadium,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(`/matches/${response.data.data._id}`);
        } catch (err) {
            console.error(err);
            setError(t("Failed to create match. Please try again."));
        }
    };

    useEffect(() => {
        const lang = i18n.language;
        lang === "ar" ? (document.body.dir = "rtl") : "ltr";
        lang != "ar" ? (document.body.dir = "ltr") : "rtl";
    }, [i18n.language]);

    return (
        <>
            <UserNav/>
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Form */}
                    <Card className="p-8">
                        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text ">
                            {t("Create a Match")}
                        </h1>
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                                    {t("Title")}
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder={t("Enter the title of the match")}
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                                    {t("Location")}
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition appearance-none bg-white"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'><polyline points='1,1 5,5 9,1' fill='none' stroke='currentColor' stroke-width='1'/></svg>")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 0.75rem center',
                                        backgroundSize: '0.75rem',
                                    }}
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                                        {t("Date")}
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        placeholder={t("Enter the date of the match")}
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                                        {t("Time")}
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        placeholder={t("Enter the time of the match")}
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="maxPlayers" className="block text-gray-700 font-medium mb-2">
                                    {t("Maximum Players")}
                                </label>
                                <input
                                    type="number"
                                    id="maxPlayers"
                                    name="maxPlayers"
                                    placeholder={t("Enter the maximum number of players")}
                                    value={formData.maxPlayers}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                                    {t("Price")}
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder={t("Enter the price of the match")}
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {t("Create Match")}
                            </Button>
                        </form>
                    </Card>

                    {/* Right Column: Map */}
                    <Card className="p-0 overflow-hidden">
                        <div className="h-[600px] z-50">
                            <Map lat={selectedStadium?.lat} lng={selectedStadium?.lng} />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
});

export default CreateMatch;