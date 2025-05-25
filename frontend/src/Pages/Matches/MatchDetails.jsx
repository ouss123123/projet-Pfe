import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNav from "../../Components/Navbar/userNav";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";

const MatchDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [match, setMatch] = useState(null);
    const [error, setError] = useState("");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const fetchMatch = async () => {
            try {
                const response = await axiosInstance.get(`/matches/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data);
                setMatch(response.data);
            } catch (err) {
                setError(t("Failed to fetch match details"));
            }
        };
        fetchMatch();
    }, [id, token, navigate, t]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }
    if (!match) {
        return <div className="text-center mt-10">{t("Loading...")}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <UserNav />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="container mx-auto mt-24 max-w-xl bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-4 text-green-700">
                        {match.data.title}
                    </h1>
                    <div className="mb-2">
                        <span className="font-semibold">{t("Location")}:</span>{" "}
                        {match.data.location}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">{t("Date")}:</span>{" "}
                        {match.data.date
                            ? new Date(match.data.date).toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                            })
                            : ""}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">{t("Time")}:</span>{" "}
                        {match.data.time}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">{t("Maximum Players")}:</span>{" "}
                        {match.data.maxPlayers}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">{t("Created By")}:</span>{" "}
                        {match.user.name}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">{t("Players")}:</span>{" "}
                        {match.data.players?.length || 0}
                    </div>
                    {match.players && match.players.length > 0 && (
                        <div className="mb-2">
                            <span className="font-semibold">{t("Players List")}:</span>
                            <ul className="list-disc ml-6">
                                {match.players.map((player, idx) => (
                                    <li key={idx}>{player.name || player}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Spots visualization */}
                <div className="container mx-auto mt-24 max-w-xl bg-white p-8 rounded-xl shadow-lg">
                    <div className="font-bold text-lg mb-2">
                        {match.data.maxPlayers - (match.data.players?.length || 0)} spots
                        left
                    </div>
                    <div className="flex flex-row gap-8">
                        {/* Light Tees */}
                        <div>
                            <div className="font-semibold text-gray-700 mb-2">
                                Team 1 (
                                {match.data.players?.filter((p) => p.team === "light")
                                    .length || 0}
                                /{match.data.maxPlayers / 2})
                            </div>
                            {[...Array(match.data.maxPlayers / 2)].map((_, idx) => {
                                const player = match.data.players?.filter(
                                    (p) => p.team === "light"
                                )[idx];
                                return (
                                    <div key={idx} className="flex flex-col items-center mb-2">
                                        {player ? (
                                            <>
                                                <img
                                                    src="/images/default.webp"
                                                    alt="player"
                                                    className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                                                />
                                                <span className="text-xs font-semibold text-gray-800">
                                                    {player.name || player}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                                                    <span className="text-gray-400">open spot</span>
                                                </div>
                                                <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                                                    Join Game
                                                </span>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Dark Tees */}
                        <div>
                            <div className="font-semibold text-gray-700 mb-2">
                                Team 2 (
                                {match.data.players?.filter((p) => p.team === "dark")
                                    .length || 0}
                                /{match.data.maxPlayers / 2})
                            </div>
                            {[...Array(match.data.maxPlayers / 2)].map((_, idx) => {
                                const player = match.data.players?.filter(
                                    (p) => p.team === "dark"
                                )[idx];
                                return (
                                    <div key={idx} className="flex flex-col items-center mb-2">
                                        {player ? (
                                            <>
                                                <img
                                                    src="/images/default.webp"
                                                    alt="player"
                                                    className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                                                />
                                                <span className="text-xs font-semibold text-gray-800">
                                                    {player.name || player}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                                                    <span className="text-gray-400">open spot</span>
                                                </div>
                                                <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                                                    Join Game
                                                </span>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                    {t("Back")}
                </button>
            </div>
        </div>
    );
};

export default MatchDetails;
