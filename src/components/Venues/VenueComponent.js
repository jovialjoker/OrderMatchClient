import React from "react";

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

const VenueComponent = ({ isDonating, type, name, id }) => {
  return (
    <Box
    //   maxW={{ base: "full", md: "275px" }}
      w={"60rem"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        {/* <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex> */}
        <Box mt={2}>
          <Heading size="md"><b>Name: </b>{name}</Heading>
          <Text mt={1} fontSize={"sm"}>
            <b>Type: </b> {type}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          <Link to={`/Venues/${id}`}>Learn more</Link>
        </Button>
      </Stack>
    </Box>
  );
};


export default VenueComponent;
