import React from "react";
import VenueComponent from "../../components/Venues/VenueComponent";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CourierComponent from "../../components/Couriers/CourierComponent";
import OrderComponent from "../../components/Orders/OrderComponent";

const OrderList = () => {
  const [orders, setOrder] = React.useState([1, 2]);
  React.useEffect(() => {
    const getVenues = async () => {
      const res = await fetch("http://192.168.1.142:8080/orders/");
      const data = await res.json();
      setOrder(data);
    };
    getVenues();
  }, []);

  return (
    <>
      <Box p={4}>
        <Flex flexDir={"row"} w={"100rem"}>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
              Order List
            </Heading>
            <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis obcaecati ut cupiditate pariatur, dignissimos, placeat
              amet officiis.
            </Text>
          </Stack>
        </Flex>

        <Container maxW={"5xl"} mt={12}>
          <Flex flexWrap="wrap" gridGap={12} justify="center">
            {orders.map((order) => (
              <OrderComponent key={order.uuid} heading={order.receivingName}
              description={order.venueName}
              //icon={<Icon as={FcAssistant} w={10} h={10} />}
              href={order.uuid}/>
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default OrderList;
