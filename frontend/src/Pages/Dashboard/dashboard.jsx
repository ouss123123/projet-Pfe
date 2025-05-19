import React from "react";
import Navbar from "../../Components/Navbar/userNav";
import Matches from "../../Pages/Matches/displayMatches";

const Dashboard = () => {

  return (
    <div className="w-full">
      <Navbar />
      <Matches />
    </div>
  );
};

export default Dashboard;