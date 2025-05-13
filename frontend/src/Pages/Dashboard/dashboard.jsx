import React from "react";
import Navbar from "../../Components/Navbar/userNav";
import Map from "../../Components/Map/Map";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

  return (
    <>
      <Navbar />
      <div className="dashbord-content">
        <div className="container mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Outlet />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-96">
                <Map/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;