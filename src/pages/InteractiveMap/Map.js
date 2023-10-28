import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Tooltip,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import CustomMarkers from "../../components/CustomMarkers";
import { icons } from "../../common/Icons";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const InteractiveMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [center, setCenter] = useState({
    lat: 10.99835602,
    lng: 77.01502627,
  });
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  function showPosition(position) {
    setIsLoaded(false);
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setIsLoaded(true);
  }

  
  return (
    isLoaded && (
      <MapContainer
        style={{ width: "100%", height: "90vh" }}
        center={[center.lat, center.lng]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[center.lat + 0.005, center.lng+ 0.005]} icon={driver}>
          <Popup>Popup for Marker</Popup>
          <Tooltip>Tooltip for Marker</Tooltip>
        </Marker>
        <Polyline pathOptions={{ color: "black" }} positions={[[center.lat, center.lng], [center.lat + 0.01, center.lng+ 0.01]]} />
        <Marker position={[center.lat + 0.01, center.lng+ 0.01]} icon={venue}>
          <Popup>Popup for Marker</Popup>
          <Tooltip>Tooltip for Marker</Tooltip>
        </Marker> */}
        {/* <Marker position={[center.lat, center.lng]} icon={receiver}>
          <Popup>Popup for Marker</Popup>
          <Tooltip>Tooltip for Marker</Tooltip>
        </Marker> */}
        <CustomMarkers coords={[center.lat, center.lng]} icon={icons.receiver} name={"receiver"}/>
        <CustomMarkers coords={[center.lat + 0.005, center.lng+ 0.005]} icon={icons.driver} name={"driver"}/>
        <CustomMarkers coords={[center.lat + 0.01, center.lng + 0.01]} icon={icons.venue} name={"receiver"}/>
        <Polyline pathOptions={{ color: "black" }} positions={[[center.lat, center.lng], [center.lat + 0.01, center.lng+ 0.01]]} />
      </MapContainer>
    )
  );
};

export default InteractiveMap;
