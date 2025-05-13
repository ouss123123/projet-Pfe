import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ location }) => {
  const [position, setPosition] = useState([31.7917, -7.0926]);
  useEffect(() => {
    try {
      location &&
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
        )
          .then((t) => t.json())
          .then((t) => {
            t.length > 0 &&
              setPosition([parseFloat(t[0].lat), parseFloat(t[0].lon)]);
          })
          .catch((t) => console.error("Error fetching location:", t));
    } catch (t) {
      console.log(t);
    }
  }, [location]);
  return (
    <div className="z-[-1] w-full">
      {position && (
        <MapContainer
          center={position}
          zoom={4}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>{location || "Selected Location"}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;