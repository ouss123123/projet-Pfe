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
    const [newComment, setNewComment] = useState("");
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
            const token = sessionStorage.getItem("token");
            await axiosInstance.patch(
                `/matches/${match_id}`,
                {
                    players: [{ user: userId, team }],
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert(t("You have joined the match!"));
            window.location.reload();
        } catch (err) {
            alert(t("Failed to join match"));
        }
    };
    const handleLeaveMatch = async () => {
        try {
            const userId = sessionStorage.getItem("userId");
            const token = sessionStorage.getItem("token");
            await axiosInstance.delete(
                `/matches/players/${match_id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { playerId: userId },
                }
            );
            alert(t("You have left the match!"));
            window.location.reload();
        } catch (err) {
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
        alert(t("Comment added successfully"));
        window.location.reload();
      } catch (err) {
        alert(t("Failed to add comment"));
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <UserNav />
        <div className="grid grid-cols-3 gap-8 p-4">
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
            {/* Cancel/Leave Buttons */}
            <div className="flex gap-4 mt-6">
              {/* Cancel Match: Only show if user is creator */}
              {sessionStorage.getItem("userId") ===
                (match.data.createdBy?._id || match.data.createdBy) && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleCancelMatch}
                >
                  Cancel Match
                </button>
              )}
              {/* Leave Match: Show if user is a player but not creator */}
              {sessionStorage.getItem("userId") !==
                (match.data.createdBy?._id || match.data.createdBy) &&
                match.data.players?.some(
                  (p) => (p.user || p) === sessionStorage.getItem("userId")
                ) && (
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={handleLeaveMatch}
                  >
                    Leave Match
                  </button>
                )}
            </div>
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
                          <span
                            className="text-xs text-blue-600 cursor-pointer hover:underline"
                            onClick={() => handleJoinMatch("light")}
                          >
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
                          <span
                            className="text-xs text-blue-600 cursor-pointer hover:underline"
                            onClick={() => handleJoinMatch("dark")}
                          >
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
          <div className="container mx-auto mt-24 max-w-xl bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mt-8">
              {t("Comments")}
            </h2>
            {/* Add Comment Input */}
            <form
              className="flex flex-col items-center gap-2 mb-4"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleAddComment();
              }}
            >
              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                rows={2}
                placeholder={t("Add a comment...")}
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {t("Add Comment")}
              </button>
            </form>
            <div className="container mx-auto mt-4 max-w-xl bg-white p-4 rounded-xl shadow-lg">
                {match.data.comments && match.data.comments.length > 0 ? (
                    match.data.comments.map((comment, idx) => (
                    <div
                        key={idx}
                        className="border-b border-gray-200 py-2 flex items-start"
                    >
                        <img
                        src="/images/default.webp"
                        alt="user"
                        className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                        <p className="font-semibold">{comment.createdBy.name}</p>
                        <p className="text-gray-600">{comment.comment}</p>
                        <p className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                        </p>
                        </div>
                    </div>
                    ))
              ) : (
                <p className="text-gray-500">{t("No comments yet")}</p>
              )}
            </div>
          </div>
        </div>
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
