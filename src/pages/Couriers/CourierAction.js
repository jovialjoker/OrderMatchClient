import React, {useState} from "react";
import {Box, Container, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import OrderComponent from "../../components/Orders/OrderComponent";
import CourierActionComponent from "../../components/Couriers/CourierActionComponent";

const CourierAction = () => {
    const [courierId, setCourierId] = useState(null);
    const [actions, setActions] = React.useState([]);

    React.useEffect(() => {
        const courierId = window.location.href.split('/').pop()
        setCourierId(courierId);

        const getCurrentActions = async () => {
            const res = await fetch(`http://192.168.1.142:8080/orders/actions/${courierId}`);
            const data = await res.json();
            setActions(data);
        };
        getCurrentActions();
    }, []);

    return (
        <>
            <Box p={4}>
                <Flex flexDir={"row"} w={"100rem"}>
                    <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
                            Courier actions
                        </Heading>
                        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
                            Here you can view the courier actions
                        </Text>
                    </Stack>
                </Flex>

                <Container maxW={"5xl"} mt={12}>
                    <Flex flexWrap="wrap" gridGap={12} justify="center">
                        {actions.length ? actions.map((action, index) => (
                            <CourierActionComponent action={action} index={index} courierId={action.courierId} actionLengths={actions.length} nextAction={index + 1 > actions.length - 1 ? null : actions[index + 1]} />
                        )) :
                            (
                                <Text color={"red.500"} fontSize={{ base: "sm", sm: "lg" }}>
                                    There is no action available
                                </Text>
                            )
                        }
                    </Flex>
                </Container>
            </Box>
        </>
    );
};

export default CourierAction;