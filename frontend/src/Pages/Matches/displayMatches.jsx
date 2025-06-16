import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import Navbar from "../../Components/Navbar/userNav";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const DisplayMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [search, setSearch] = useState(false);
    const [searchMatch, setSearchMatch] = useState([]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const getMatches = async () => {
            try {
                const response = await axiosInstance.get(`/matches`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMatches({ ...response.data, data: response.data.data });
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

    const realTotalPages = matches && matches.total && matches.total > 0 ? Math.ceil(matches.total / 9) : 1;

    const handleSearch = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(
                `/matches/search?title=${title}&location=${location}`,
                { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
            );
            setMatches({ data: res.data.data || [] });
            setSearchMatch(res.data.data || []);
            setTotalPages(1); // Only 1 page for search results
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Search error:", err);
        }
    };

    const matchesToDisplay = searchMatch.length > 0 ? searchMatch : (matches.data || []);
    return (
        <div className="container mx-auto px-4 py-8 mt-24">
            <Navbar />
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by title"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-base"
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by location"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-base"
                    onChange={e => setLocation(e.target.value)}
                />
                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200"
                        onClick={handleSearch}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                        >
                            <g fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="7"></circle>
                                <path strokeLinecap="round" d="m20 20l-3-3"></path>
                            </g>
                        </svg>
                        Search
                    </button>
                </div>
            </div>
            {/* Matches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchesToDisplay.length > 0 ? matchesToDisplay.map((match) => (
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
                                            {match.price ? `${match.price}DH` : "Free"}
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
                                        {match?.createdBy?.name || "Football"}
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
                )) : (
                    <Card className="p-8 text-center col-span-3">
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No matches found</h2>
                        <p className="text-gray-500">Check back later for new matches!</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default DisplayMatches;