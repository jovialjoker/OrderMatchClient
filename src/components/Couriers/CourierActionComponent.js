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

const CourierComponent = ({ action, index, courierId, actionLengths, nextAction }) => {
    const updateActionCourier = async () => {
        if (!index) {
            await fetch(`http://192.168.1.142:8080/orders/update-actions`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courierId: action.courierOrderSort.courierId,
                    actionId: action.courierOrderSort.uuid,
                    orderId: action.courierOrderSort.orderId,
                    orderStatus: action.courierOrderSort.actionType === "DELIVERY" ? "FINISHED" : "PICKING_UP",
                    courierStatus: actionLengths <= 1 || nextAction == null ? "FREE" : (
                        nextAction.courierOrderSort.actionType === "DELIVERY" ? "DELIVERY" : "PICKUP"
                    )
                })
            });
        }
    }

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
                    <Heading size="md">Order ID: {action.courierOrderSort.orderId} - {action.courierOrderSort.actionType}</Heading>
                    <Text mt={1} fontSize={"sm"}>
                        {action.venue.name}
                    </Text>
                </Box>
                { index == 0 ?
                (<Button onClick={() => updateActionCourier()} variant={"link"} colorScheme={"blue"} size={"sm"}>
                    Finish this action
                </Button>) : (<></>)
                }
            </Stack>
        </Box>
    );
};

export default CourierComponent;
