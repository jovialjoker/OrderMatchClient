import React from "react";
import { Tooltip, Marker, Popup } from "react-leaflet";

const CustomMarkers = ({ coords, icon, name }) => {
  return (
    <Marker position={coords} icon={icon}>
      <Popup>Popup for Marker</Popup>
      <Tooltip>{name}</Tooltip>
    </Marker>
  );
};

export default CustomMarkers;
