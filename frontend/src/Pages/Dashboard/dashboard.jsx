import React from "react";
import Navbar from "../../Components/Navbar/userNav";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Outlet } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const position = [51.505, -0.09]; // Default map center (latitude, longitude)

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
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full rounded-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>
                      A sample popup. <br /> Customize as needed.
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;