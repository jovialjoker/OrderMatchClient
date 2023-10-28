'use client'

import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from '@chakra-ui/react'

const Feature = ({ orderId, donor, receiver, estimatedTime, emissionsSaved }) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        Order: {orderId}
      </chakra.h3>
      <chakra.p> <chakra.b>Donor:</chakra.b> {donor}</chakra.p>
      <chakra.p>Receiver: {receiver}</chakra.p>
      <chakra.p>Estimated time: {estimatedTime}</chakra.p>
      <chakra.p>Emissions saved: {emissionsSaved}</chakra.p>
    </GridItem>
  )
}

export default function ViewOrder() {
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}>
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Order: id
            </chakra.h2>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
          <Button colorScheme="green" size="md">
              Received
            </Button>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}>
        <Feature
          orderId={"1"}
          donor={"donor 1"}
          receiver={"receiver 1"}
          estimatedTime={"12 min"}  
          emissionsSaved={"12"}
        />
        <Feature
          heading={'Order 2'}
          text={'Short text describing one of you features/service'}
        />
        <Feature
          heading={'Third Feature'}
          text={'Short text describing one of you features/service'}
        />
        <Feature
          heading={'Fourth Feature'}
          text={'Short text describing one of you features/service'}
        />
      </Grid>
    </Box>
  )
}