import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InsertCouriers = () => {
  const navigate = useNavigate();
  const [courier, setCourier] = useState({
    name: "",
    phoneNumber: "",
    vehicleType: "",
    vehicleEmission: "",
    lastLong: null,
    lastLat: null,
    maxCapacity: null,
    status: "DEACTIVATED",
  });

  const [center, setCenter] = useState({
    lat: 10.99835602,
    lng: 77.01502627,
  });
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  function showPosition(position) {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  const clickHandler = async (e) => {
    e.preventDefault();
    setCourier({...courier, lastLat: center.lat, lastLong: center.lng})
    
    await fetch("http://192.168.1.142:8080/couriers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that you're sending JSON data
      },
      body: JSON.stringify({
        ...courier,
        maxCapacity: parseFloat(courier.maxCapacity),
        vehicleEmission: parseFloat(courier.vehicleEmission),
        lastLat: center.lat, lastLong: center.lng
      }),
    });
    navigate("/Couriers")
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add a new courier
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
            Contribute to making a better world by adding your business to our
            app
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={courier.name}
                onChange={(e) =>
                  setCourier({ ...courier, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="number" isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input
                type="text"
                value={courier.phoneNumber}
                onChange={(e) =>
                  setCourier({ ...courier, phoneNumber: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Vehicle type</FormLabel>
              <Select
                placeholder="Select option"
                value={courier.vehicleType }
                onChange={(e) =>
                  setCourier({ ...courier, vehicleType : e.target.value })
                }
              >
                <option value="ELECTRIC">Elctric</option>
                <option value="NORMAL">Normal</option>
              </Select>
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Vehicle emissions</FormLabel>
              <Input
                type="number"
                value={courier.vehicleEmission}
                onChange={(e) =>
                  setCourier({ ...courier, vehicleEmission: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Max capacity</FormLabel>
              <Input
                type="number"
                value={courier.maxCapacity}
                onChange={(e) =>
                  setCourier({ ...courier, maxCapacity: e.target.value })
                }
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={clickHandler}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default InsertCouriers;
