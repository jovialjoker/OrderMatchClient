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

const OrderComponent = ({ status, donor, receiver, distance }) => {
  return (
    <Box
      w={"60rem"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Box mt={2}>
          <Heading size="md">Receiver: {receiver}</Heading>
          <Text mt={1} fontSize={"sm"}>
            Donor: {donor}
          </Text>
          <Text mt={1} fontSize={"sm"}>
            Distance: {distance}
          </Text>
          <Text mt={1} fontSize={"sm"}>
            Status: {status}
          </Text>
        </Box>
        
      </Stack>
    </Box>
  );
};

export default OrderComponent;
