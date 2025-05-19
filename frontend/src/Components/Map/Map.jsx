import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Component to update the map center dynamically
const UpdateMapCenter = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
};

const Map = React.memo(({ lat, lng }) => {
  const position = [lat || 30.399724133263636, lng || -9.550289511629696];

  return (
    <div>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: "550px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
        {/* Update the map center dynamically */}
        <UpdateMapCenter lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
});

export default Map;