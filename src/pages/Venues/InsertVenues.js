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
import VenueMap from "../../components/Venues/VenueMap";
import React from "react";

function InsertVenues() {
  const [formState, setFormState] = React.useState({uuid: "00000000-0000-0000-0000-000000000000", isDonating: false});
  const [coords, setCoords] = React.useState({});
  React.useEffect(() => {
    setFormState({ ...formState, long : coords.lng, lat: coords.lat });
  }, [coords]);
  const clickHandler = async (e) => {
    e.preventDefault();
    console.log(formState)
    await fetch("http://192.168.1.142:8080/venues",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Specify that you're sending JSON data
      },
      body: JSON.stringify(formState)
    })
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
            Add a new venue
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
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="venue_type" isRequired>
              <FormLabel>Venue type</FormLabel>
              <Select
                placeholder="Select option"
                value={formState.typeOfVenue }
                onChange={(e) =>
                  setFormState({ ...formState, typeOfVenue : e.target.value })
                }
              >
                <option value="RESTAURANT">Restaurant</option>
                <option value="MARKET_PLACE">Marketplace</option>
                <option value="FOOD_BANK">Food bank</option>
                <option value="SHELTERS">Shelter</option>
              </Select>
            </FormControl>
            <FormControl id="donating">
              <FormLabel>Are you donating?</FormLabel>
              <Checkbox
                value={formState.isDonating}
                onChange={(e) =>
                  setFormState({ ...formState, isDonating : e.target.value == 'false' ? false : true })
                }
              ></Checkbox>
            </FormControl>
            <FormControl id="donating">
              <FormLabel>location</FormLabel>
              <VenueMap value={coords} changeHandler={setCoords} />
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
export default InsertVenues;
