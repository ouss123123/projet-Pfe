import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const DisplayMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const groupMatchesByDate = (matchesArr) => {
        const groups = {};
        matchesArr.forEach((match) => {
            const date = dayjs(match.date).format("dddd, MMMM DD");
            if (!groups[date]) groups[date] = [];
            groups[date].push(match);
        });
        return groups;
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const getMatches = async () => {
            try {
                const response = await axiosInstance.get(`/matches?limit=10&page=${page}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMatches(response.data);
                setTotalPages(Math.ceil(response.data.total / 10) || 1);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching matches:", error);
                setLoading(false);
            }
        };
        getMatches();
    }, [token, navigate, page]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }
    
    if (!matches.data || matches.data.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">No matches found</h2>
                    <p className="text-gray-500">Check back later for new matches!</p>
                </Card>
            </div>
        );
    }

    const grouped = groupMatchesByDate(matches.data);

    return (
        <div className="container mx-auto px-4 py-8">
            {Object.entries(grouped).map(([date, matchesOnDate]) => (
                <div key={date} className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {date === dayjs().format("dddd, MMMM DD") ? "Today" : date}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matchesOnDate.map((match) => (
                            <motion.div
                                key={match._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="h-full">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {match.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {match.tags?.map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary">
                                                    {match.price ? `£${match.price}` : "Free"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {match.players?.length || 0}/{match.maxPlayers || 0} players
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {match.time ? new Date(`1970-01-01T${match.time}`).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }) : "--:--"}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {match.location || "Unknown location"}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                {match.type || "Football"}
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => navigate(`/matches/${match._id}`)}
                                            className="w-full mt-6"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8 mb-12">
                <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="text-gray-600 font-medium">
                    Page {page} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default DisplayMatches;