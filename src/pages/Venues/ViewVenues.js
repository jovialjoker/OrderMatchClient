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
import React from "react";
import { useNavigate } from "react-router-dom";
const ViewVenues = () => {
  const [venues, setVenues] = React.useState([])
  const navigate = useNavigate();
  const [order, setOrder] = React.useState({
    assignedCourierId: null,
    pickupVenueId: null,
    deliveryVenueId: null,
    rating: 0,
    pickupTime: new Date(),
    deliveryTime: new Date(),
    pickupDistance: 0,
    deliveryDistance: 0,
    status: "IN_PROGRESS",
    capacity: null,
    createdAt: new Date(),
  });

  React.useEffect(()=>{
    const id = window.location.href.split('/').pop()
    setOrder({...order, pickupVenueId: id})
  },[])
  
  React.useEffect(() => {
    const getVenues = async () =>{
      const res = await fetch("http://192.168.1.142:8080/venues/without-donating")
      const data = await res.json();
      setVenues(data)
    }
    getVenues()
  },[])
  
  const clickHandler = async (e) => {
    e.preventDefault();
    console.log(order)
    await fetch("http://192.168.1.142:8080/orders",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Specify that you're sending JSON data
      },
      body: JSON.stringify(order)
    })
    navigate("/Venues")
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
            Place an order
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
            <FormControl id="venue_type" isRequired>
              <FormLabel>Venue type</FormLabel>
              <Select
                placeholder="Select option"
                value={order.deliveryVenueId }
                onChange={(e) =>
                  setOrder({ ...order, deliveryVenueId : e.target.value })
                }
              >
                {venues.map(venue => <option key={venue.id} value={venue.id}>{venue.name}</option>)}
              </Select>
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Capacity</FormLabel>
              <Input
                type="number"
                value={order.capacity}
                onChange={(e) =>
                  setOrder({ ...order, capacity: parseInt(e.target.value) })
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
}

export default ViewVenues