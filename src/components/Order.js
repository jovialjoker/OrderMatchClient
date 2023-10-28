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
import CustomMarkers from "./CustomMarkers";
import { icons } from "../common/Icons";

const Order = ({ driverId, venue, receiver }) => {
    const [driverCoords, setDriverCoords] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getDriverCoords = async (driverId) => {
        setIsLoading(true);
        const res = await fetch("url/driverId")
        const coords = await res.json()
        setDriverCoords(coords)
        setIsLoading(false)
    }
    React.useEffect(()=>{
        let interval = setInterval(()=> {getDriverCoords()}, 1000)
        return () => clearInterval(interval)
    },[])
  return (
    <>
      <CustomMarkers
        coords={[venue.lat, venue.lng]}
        icon={icons.receiver}
        name={"receiver"}
      />
      {isLoading && <CustomMarkers
        coords={[driverCoords.lat, driverCoords.lng ]}
        icon={icons.driver}
        name={"driver"}
      />}
      <CustomMarkers
        coords={[receiver.lat + 0.01, receiver.lng + 0.01]}
        icon={icons.venue}
        name={"receiver"}
      />
      {isLoading &&<Polyline
        pathOptions={{ color: "black" }}
        positions={[
          [venue.lat, venue.lng],
          [driverCoords.lat, driverCoords.lng ],
          [receiver.lat , receiver.lng ],
        ]}
      />}
    </>
  );
};

export default Order;
