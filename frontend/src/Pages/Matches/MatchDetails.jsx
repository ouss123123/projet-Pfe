import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNav from "../../Components/Navbar/userNav";
import axiosInstance from "../../axios/axiosInstance";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Map from "../../Components/Map/Map";

const MatchDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [match, setMatch] = useState(null);
    const [error, setError] = useState("");
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");
    const [selectedStadium, setSelectedStadium] = useState(null);

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
                
                // Ensure creator is in players list
                const matchData = response.data;
                if (!matchData || !matchData.data) {
                    setError(t("Invalid match data received"));
                    return;
                }

                // Initialize players array if it doesn't exist
                if (!matchData.data.players) {
                    matchData.data.players = [];
                }

                const creatorId = matchData.data.createdBy?._id || matchData.data.createdBy;
                const creatorName = matchData.user?.name || "Unknown Creator";
                const creatorProfilePic = matchData.user?.profile_picture || "/images/default.webp";

                // Check if creator is already in players list
                const creatorExists = matchData.data.players.some(
                    p => (p.user || p._id || p) === creatorId
                );

                if (!creatorExists && creatorId) {
                    // Add creator to players list if not already present
                    matchData.data.players.push({
                        user:{
                            _id: creatorId,
                            name: creatorName,
                            profile_picture: creatorProfilePic
                        }
                    });
                }

                setMatch(matchData);
            } catch (err) {
                setError(t("Failed to fetch match details"));
            }
        };
        const getComments = async () => {
            try {
                const response = await axiosInstance.get(
                    `/comments/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setComments(response.data.data || []);
            } catch (err) {
                alert(t("Failed to fetch comments"));
            }
        };
        fetchMatch();
        getComments();
    }, [id, token, navigate, t]);

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gray-50 flex items-center justify-center"
            >
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            </motion.div>
        );
    }

    if (!match) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const match_id =match.data._id;
    const handleCancelMatch = async () => {
        if (window.confirm(t("Are you sure you want to cancel this match?"))) {
            try {
                const token = sessionStorage.getItem("token");
                const response = await axiosInstance.delete(
                    `/matches/${match_id}`,
                    {
                        data: { isCanceled: true },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log(response.data);
                alert(t("Match cancelled successfully"));
                navigate("/dashboard");
            } catch (err) {
                alert(t("Failed to cancel match"));
            }
        }
    }

    // Join Match handler
    const handleJoinMatch = async (team) => {
        try {          
            const userId = sessionStorage.getItem("userId");
            const userName = sessionStorage.getItem("name");
            const userProfilePic = sessionStorage.getItem("profile_picture");
            const token = sessionStorage.getItem("token");

            // Optimistically update the UI
            const newPlayer = {
                user:{
                    _id: userId,
                    name: userName,
                    profile_picture: userProfilePic
                }
            };

            // Update the match data immediately
            setMatch(prevMatch => ({
                ...prevMatch,
                data: {
                    ...prevMatch.data,
                    players: [...(prevMatch.data.players || []), newPlayer]
                }
            }));

            // Make the API call
            await axiosInstance.patch(
                `/matches/${match_id}`,
                {
                    players: [{ user: userId }],
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (err) {
            // Revert the optimistic update if the API call fails
            setMatch(prevMatch => ({
                ...prevMatch,
                data: {
                    ...prevMatch.data,
                    players: prevMatch.data.players.filter(p => p.user !== sessionStorage.getItem("userId"))
                }
            }));
        }
    };
    const handleLeaveMatch = async () => {
        try {
            const userId = sessionStorage.getItem("userId");
            const token = sessionStorage.getItem("token");

            // Optimistically update the UI
            setMatch(prevMatch => ({
                ...prevMatch,
                data: {
                    ...prevMatch.data,
                    players: prevMatch.data.players.filter(p => p.user._id !== userId)
                }
            }));

            await axiosInstance.delete(
                `/matches/players/${match_id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { playerId: userId }
                }
            );
        } catch (err) {
            // Revert the optimistic update if the API call fails
            setMatch(prevMatch => ({
                ...prevMatch,
                data: {
                    ...prevMatch.data,
                    players: [...prevMatch.data.players]
                }
            }));
            alert(t("Failed to leave match"));
        }
    }
    
    const handleAddComment = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");
        await axiosInstance.post(
          `/comments`,
          {
            createdBy: userId,
            match: match_id,
            comment: newComment,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNewComment("");
        // Fetch the latest comment from the server to get full user info
        const res = await axiosInstance.get(`/comments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(res.data.data);
      } catch (err) {
        alert(t("Failed to add comment"));
      }
    };

    const isCreator = (playerId) => {
        if (!match?.data?.createdBy) return false;
        return playerId === (match.data.createdBy._id || match.data.createdBy);
    };

    
    console.log(match.data.players.user?.profile_picture);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-24">
            <UserNav />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Match Info, Stadium, Comments */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Match Info Card */}
                        <Card className="w-full p-6 sm:p-8">
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                {match.data.title}
                            </h1>
                            <div className="flex flex-wrap gap-6 mb-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {new Date(match.data.date).toLocaleDateString()} at {match.data.time}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {match.data.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    {match.data.players?.length || 0}/{match.data.maxPlayers} Players
                                </div>
                            </div>
                            {/* Match Creator Info */}
                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center space-x-4">
                                <img
                                    src={match.user?.profile_picture 
                                        ? (match.user.profile_picture.includes("uploads")
                                            ? `http://localhost:5000/uploads/usersImages/${match.user.profile_picture.split("\\").pop()}`
                                            : match.user.profile_picture.includes("http")
                                            ? match.user.profile_picture
                                            : `http://localhost:5000/${match.user.profile_picture.split("\\").pop()}`)
                                        : "http://localhost:5000/public/images/default.webp"}
                                    alt={match.user?.name || "Creator"}
                                    className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Organized by {match.user?.name || "Unknown"}</h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">Rating: <span className="text-yellow-500">★ 4.8/5</span></div>
                                </div>
                            </div>
                            {/* Stadium Map */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Stadium Location</h3>
                                <div className="h-48 rounded-lg overflow-hidden relative z-0">
                                    <Map lat={selectedStadium?.lat} lng={selectedStadium?.lng} />
                                </div>
                            </div>
                        </Card>
                        {/* Comments Card */}
                        <Card className="w-full p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Comments ({comments.length})</h2>
                            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                                {comments.map((comment, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <img
                                            src={comment.createdBy?.profile_picture?.includes("uploads")
                                                ? `http://localhost:5000/uploads/usersImages/${comment.createdBy?.profile_picture?.split("\\").pop()}`
                                                : `http://localhost:5000/${comment.createdBy?.profile_picture?.split("\\").pop()}`
                                            }
                                            alt={comment.createdBy?.name}
                                            className="w-9 h-9 rounded-full object-cover border-2 border-blue-300 shadow-md"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-800 text-sm">{comment.createdBy?.name || comment.createdBy}</span>
                                                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm mt-1">{comment.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={async (e) => { e.preventDefault(); await handleAddComment(); }} className="flex items-end gap-2">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={t("Add a comment...")}
                                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                                    rows="1"
                                />
                                <Button type="submit" className="px-5 py-2 text-sm">Post Comment</Button>
                            </form>
                        </Card>
                    </div>
                    {/* RIGHT COLUMN: Player Count/Join/Leave/Cancel, Players List */}
                    <div className="space-y-8">
                        {/* Player Count & Join/Leave/Cancel Card */}
                        <Card className="w-full p-6 text-center flex flex-col items-center">
                            <div className="text-2xl font-bold text-blue-700 mb-2">{match.data.players?.length || 0}<span className="text-gray-400">/{match.data.maxPlayers}</span></div>
                            <div className="text-sm text-gray-500 mb-4">Players</div>
                            {sessionStorage.getItem("userId") === (match.data.createdBy?._id || match.data.createdBy) ? (
                                <Button variant="danger" onClick={handleCancelMatch} className="w-full max-w-xs">Cancel Match</Button>
                            ) : match.data.players?.some((p) => p.user._id === sessionStorage.getItem("userId")) ? (
                                <Button variant="secondary" onClick={handleLeaveMatch} className="w-full max-w-xs">Leave Match</Button>
                            ) : (
                                <Button onClick={() => handleJoinMatch()} className="w-full max-w-xs">Join Match</Button>
                            )}
                        </Card>
                        {/* Players List Card */}
                        <Card className="w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Players ({match.data.players?.length || 0})</h3>
                            <div className="space-y-3">
                                {match.data.players?.map((player, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <img
                                            src={player.user.profile_picture.includes("uploads")
                                                    ? `http://localhost:5000/uploads/usersImages/${player.user.profile_picture.split("\\").pop()}`
                                                    : `http://localhost:5000/${player.user.profile_picture.split("\\").pop()}`}
                                            alt={player.user?.name || "Player"}
                                            className="w-8 h-8 rounded-full border-2 border-blue-300 object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800 text-sm">{player.user?.name || "Unknown"}</div>
                                        </div>
                                        {isCreator(player.user || player._id || player) && (
                                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-semibold">Organizer</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex justify-center mt-8"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {t("Back")}
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default MatchDetails;
