import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/userNav";
import axiosInstance from "../../axios/axiosInstance";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axiosInstance.get("/matches?limit=3&page=1", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpcomingMatches(res.data.data || []);
      } catch (err) {
        setUpcomingMatches([]);
      }
      setLoading(false);
    };
    fetchMatches();
  }, [token]);

  // Helper to get only the first 3 matches
  const getTop3Matches = (matchesArr) => {
    if (!Array.isArray(matchesArr)) return [];
    return matchesArr.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8fd] via-[#ece9fc] to-[#e0e7ff] w-full mt-22">
      <Navbar />
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-green-400 py-15 px-2 flex flex-col items-center relative">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-white mb-4 drop-shadow-lg">
          Find Your Perfect Football Match
        </h1>
        <p className="text-lg sm:text-xl text-white text-center max-w-2xl mb-10 opacity-90">
          Connect with players, create matches, and enjoy the beautiful game. Your
          football community awaits!
        </p>
        <div className="flex gap-4 mb-10">
          <button
            className="bg-gradient-to-r from-blue-700 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-200 text-lg"
            onClick={() => navigate("/create-match")}
          >
            Create a Match
          </button>
          <button
            className="bg-white border border-blue-200 text-blue-700 px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-50 transition-all duration-200 text-lg"
            onClick={() => navigate("/matches")}
          >
            Browse Matches
          </button>
        </div>
        
      </div>
      {/* Upcoming Matches Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Matches</h2>
          <button
            className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition-all duration-200"
            onClick={() => navigate("/matches")}
          >
            View All Matches
          </button>
        </div>
        {/* Matches List: show only 3 matches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : getTop3Matches(upcomingMatches).length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-8">No upcoming matches found.</div>
          ) : (
            getTop3Matches(upcomingMatches).map((match) => (
              <div key={match._id} className="rounded-2xl shadow bg-white flex flex-col h-full transition hover:shadow-lg border border-blue-100">
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{match.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {match.tags?.map((tag, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {match.price ? `${match.price}DH` : "Free"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {/* Add 1 to players count for match creator */}
                        {((match.players?.length || 0) + 1)}/{match.maxPlayers || 0} players
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {match.time ? new Date(`1970-01-01T${match.time}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
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
                  <button
                    className="w-full mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
                    onClick={() => navigate(`/matches/${match._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-white opacity-90">
          <div className="text-center md:text-left mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Football Community. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/matches" className="hover:underline">Matches</a>
            <a href="/profile" className="hover:underline">Profile</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;