import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, lng }) => {
  const position = [lat || 31.7917, lng || -7.0926];

  return (
    <div className="z-[-1] w-full">
      <MapContainer
        center={position}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>{`Lat: ${lat}, Lng: ${lng}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
