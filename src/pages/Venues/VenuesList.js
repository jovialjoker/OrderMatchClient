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

const VenuesList = () => {
  const [venues, setVenues] = React.useState([]);
  React.useEffect(() => {
    const getVenues = async () => {
      const res = await fetch("http://192.168.1.142:8080/venues");
      const data = await res.json();
      console.log(data);
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
              Venues List
            </Heading>
            <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
              These are all the venues available, donating or not
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
            <Link to={"/Venues/Insert-Venues"}>Click Me</Link>
          </Button>
        </Flex>

        <Container maxW={"5xl"} mt={12}>
          <Flex flexWrap="wrap" gridGap={12} justify="center">
            {venues.map((venue) => (
              <VenueComponent
                name={venue.venueName}
                //icon={<Icon as={FcAssistant} w={10} h={10} />}
                id={venue.venueId}
                isDonating={venue.isDonating}
                type={venue.venueType}
              />
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default VenuesList;
