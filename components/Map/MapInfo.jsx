import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import Recalculating from "../Feedback/Recalculating";

const MapInfo = ({ confirmed, recalculate }) => {
  const mapRef = useRef(null);
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);
  const [zoom] = useState(18);
  const [recalculating, setRecalculating] = useState(false);

  const myIcon = L.icon({
    iconUrl: "marker.svg",
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    if (confirmed === "true" && recalculate) {
      setRecalculating(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        setLat(coords.latitude);
        setLng(coords.longitude);
        setRecalculating(false);
        mapRef.current.setView([lat, lng], zoom);
      });
      return;
    } else if (confirmed === "true" && !recalculate) {
      setRecalculating(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        setLat(coords.latitude);
        setLng(coords.longitude);
        setRecalculating(false);
        mapRef.current.setView([lat, lng], zoom);
      });
      return;
    } else {
      if (mapRef.current) {
        mapRef.current.setView([lat, lng], zoom);
      }
    }
  }, [confirmed, lat, lng, recalculate, zoom]);

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker icon={myIcon} position={[lat, lng]}>
          <Popup>
            {confirmed === "true"
              ? "Your current location."
              : "A random location"}{" "}
            <br /> {"lat: " + lat + ", lng: " + lng}
          </Popup>
        </Marker>
      </MapContainer>

      {recalculating && <Recalculating />}
    </>
  );
};

export default MapInfo;
