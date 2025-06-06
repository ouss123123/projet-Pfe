import React from "react";
import Navbar from "../../Components/Navbar/userNav";
import Matches from "../../Pages/Matches/displayMatches";

const Dashboard = () => {
  // Example stats, replace with real data if available
  const stats = [
    { value: "2,543", label: "Active Players" },
    { value: "1,247", label: "Matches Organized" },
    { value: "89", label: "Cities Covered" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fd] w-full mt-22">
      <Navbar />
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-[#ece9fc] to-[#f7f8fd] py-16 px-2 flex flex-col items-center relative">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-4">
          Find Your Perfect <br /> Football Match
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
          Connect with passionate players, organize epic matches, and build
          lasting friendships. Your football community awaits – join thousands of
          players already making memories.
        </p>
        <div className="flex gap-4 mb-10">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-all duration-200">
            Create a Match
          </button>
          <button className="bg-white border border-blue-200 text-blue-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition-all duration-200">
            Browse Matches
          </button>
        </div>
        {/* Stats Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md px-10 py-6 flex flex-col items-center min-w-[180px]"
            >
              <div className="text-3xl font-extrabold text-purple-600">
                {stat.value}
              </div>
              <div className="text-gray-500 font-medium mt-2">{stat.label}</div>
              <div className="w-10 h-1 bg-purple-100 rounded-full mt-3" />
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Matches Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Matches</h2>
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition-all duration-200">
            View All Matches
          </button>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium shadow border border-gray-200">
            All Matches
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium shadow border border-gray-200">
            Open
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium shadow border border-gray-200">
            Full
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium shadow border border-gray-200">
            My Matches
          </button>
        </div>
        {/* Matches List */}
        <Matches />
      </div>
    </div>
  );
};

export default Dashboard;