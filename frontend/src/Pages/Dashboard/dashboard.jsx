import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/userNav";
import Matches from "../../Pages/Matches/displayMatches";

const Dashboard = () => {
  const navigate = useNavigate();


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
        <Matches matches={undefined} limit={3} />
      </div>
    </div>
  );
};

export default Dashboard;