import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

export default function Map({ longitude, latitude }) {
// ...existing code...
const mapHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        width: 100%;
        background: #fff;
      }
      #map {
        height: 100%;
        width: 100%;
        border-radius: 16px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
      var map = L.map('map').setView([${latitude || 0}, ${longitude || 0}], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
      L.marker([${latitude || 0}, ${longitude || 0}]).addTo(map)
        .bindPopup('Marker at ${latitude || 0}, ${longitude || 0}')
        .openPopup();
    </script>
  </body>
  </html>
`;

  // Responsive height for the map
  const { width } = Dimensions.get("window");
  const mapHeight = Math.round(width * 0.7);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: mapHtml }}
        style={[styles.webview, { height: mapHeight, borderRadius: 16, overflow: "hidden" }]}
        javaScriptEnabled
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  webview: {
    width: "100%",
    minHeight: 250,
    borderRadius: 16,
  },
});