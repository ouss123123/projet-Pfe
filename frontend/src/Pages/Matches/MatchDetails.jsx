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
                console.log(response.data.user.name);
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
            <div className="container mx-auto mt-24 max-w-xl bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-green-700">{match.data.title}</h1>
                <div className="mb-2">
                    <span className="font-semibold">{t("Location")}:</span> {match.data.location}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">{t("Date")}:</span> {match.data.date ? new Date(match.data.date).toLocaleDateString() : ""}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">{t("Time")}:</span> {match.data.time}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">{t("Maximum Players")}:</span> {match.data.maxPlayers}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">{t("Created By")}:</span> {match.user.name}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">{t("Players")}:</span> {match.data.players?.length || 0}
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
        </div>
    );
};

export default MatchDetails;
