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

const CourierComponent = ({ heading, description, icon, href }) => {
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
        
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          <Link to={`/Couriers/${href}`}>Learn more</Link>
        </Button>
      </Stack>
    </Box>
  );
};

export default CourierComponent;
