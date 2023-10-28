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
  const [couriers, setCouries] = useState([]);
  const [orders, setOrders] = useState([]);
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  const transformCouriers = (courier) => {
    return {
      courierId: courier.uuid,
      name: courier.name,
      coords: [courier.lastLat, courier.lastLong],
    };
  };
  React.useEffect(() => {
    const fct = async () => {
      const res = await fetch("http://192.168.1.142:8080/couriers/all");
      const data = await res.json();
      setCouries(data.map((e) => transformCouriers(e)));
      console.log(data.map((e) => transformCouriers(e)));
    };
    fct();
  }, []);

  function showPosition(position) {
    setIsLoaded(false);
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setIsLoaded(true);
  }

  const transormVanue = (obj, index) => {
    return {
      icon:
        obj.actionType == "PICKUP"
          ? icons.venue
          : icons.receiver,
      coords: [obj.venue.lat + index * 0.01, obj.venue.long + index * 0.01],
    };
  };

  const clickHandler = async (courierId) => {
    const res = await fetch(
      `http://192.168.1.142:8080/couriers/actions/${courierId}`
    );
    const data = await res.json();
    if(data){
      setOrders(data.map((e, index) => transormVanue(e, index)));
    }
    
  };

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
        {couriers.map((c) => (
          <CustomMarkers
            coords={c.coords}
            icon={icons.driver}
            name={c.name}
            clickHandler={() => clickHandler(c.courierId)}
          />
        ))}
        <Polyline pathOptions={{ color: "black" }} positions={orders.map(o => o.coords)} />{" "}
        {orders.map((o) => (
          <CustomMarkers coords={o.coords} icon={o.icon} name={""} />
        ))}

      </MapContainer>
    )
  );
};

export default InteractiveMap;
