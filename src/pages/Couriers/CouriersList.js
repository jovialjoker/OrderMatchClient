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
import CourierComponent from "../../components/Couriers/VenueComponent";

const CouriersList = () => {
  const [venues, setVenues] = React.useState([1, 2]);
  React.useEffect(() => {
    const getVenues = async () => {
      const res = await fetch("http://192.168.1.142:8080/couriers/all-id-name");
      const data = await res.json();
      setVenues(data);
    };
    getVenues();
  }, []);

  return (
    <>
      <Box p={4}>
        <Flex flexDir={"row"} w={"100rem"}>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
              Couriers List
            </Heading>
            <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis obcaecati ut cupiditate pariatur, dignissimos, placeat
              amet officiis.
            </Text>
          </Stack>
          <Button
            px={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <Link to={"/Couriers/Insert-Couriers"}>Click Me</Link>
          </Button>
        </Flex>

        <Container maxW={"5xl"} mt={12}>
          <Flex flexWrap="wrap" gridGap={12} justify="center">
            {venues.map((courier) => (
              <CourierComponent key={courier.uuid} heading={courier.name}
              //icon={<Icon as={FcAssistant} w={10} h={10} />}
              href={courier.uuid}/>
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default CouriersList;
