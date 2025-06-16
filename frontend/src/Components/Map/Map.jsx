import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
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

const Map = React.memo(({ lat, lng, zoom = 16, center , style}) => {
  const position = center || [lat || 30.399724133263636, lng || -9.550289511629696];

  return (
    <div className="relative" style={style}>
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "750px", width: "100%" , ...(style || {}) }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
        <ZoomControl position="bottomright" />
        <UpdateMapCenter lat={position[0]} lng={position[1]} />
      </MapContainer>
    </div>
  );
});

export default Map;