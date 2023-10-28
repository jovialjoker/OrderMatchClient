import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const ViewCourier = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [courierId, setCourierId] = useState(null);
  const [center, setCenter] = useState({
    lat: 10.99835602,
    long: 77.01502627,
  });

  const clickHandler = async () => {
    setIsActivated(!isActivated);
    const id = window.location.href.split("/").pop();
    setCourierId(id);
    fetch("http://192.168.1.142:8080/couriers/status", {
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uuid: id,
        status: !isActivated ? "FREE": "DEACTIVATED"
      })
    })
  };

  function showPosition(position) {
    setCenter({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      if (isActivated) {
        navigator.geolocation.getCurrentPosition(showPosition);

        fetch("http://192.168.1.142:8080/couriers/coords", {
          method:"PATCH",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            uuid: courierId,
            lat: center.lat,
            long: center.long
          })
        })
        
      }
    }, 1000);
    return () => clearInterval(interval)
  }, [isActivated]);
  return (
    <Box
      width={"100%"}
      height={"90vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Button
        bgColor={isActivated ? "blue" : "red"}
        color={"white"}
        onClick={() => clickHandler()}
      >
        {!isActivated ? "Activate" : "Deactivate"}
      </Button>
    </Box>
  );
};

export default ViewCourier;
