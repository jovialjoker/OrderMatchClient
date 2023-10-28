import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InteractiveMap from "./pages/InteractiveMap/Map";

import { ChakraProvider } from "@chakra-ui/react";
import GeneralLayout from "./common/Layout";
import VenuesList from "./pages/Venues/VenuesList";
import InsertVenues from "./pages/Venues/InsertVenues";
import ViewVenues from "./pages/Venues/ViewVenues";
import CouriersList from "./pages/Couriers/CouriersList";
import InsertCouriers from "./pages/Couriers/InsertCouriers";
import ViewCourier from "./pages/Couriers/ViewCourier";
import OrderList from "./pages/Orders/OrderList";
import CourierAction from "./pages/Couriers/CourierAction";
const router = createBrowserRouter([
  {
    path: "/",
    element: <GeneralLayout />,
    children: [
      {
        path: '/',
        element: <InteractiveMap/>
      },
      {
        path: '/Venues',
        children:[
          {
            path: '/Venues',
            element: <VenuesList/>,
          },
          {
            path: "/Venues/Insert-Venues",
            element: <InsertVenues />
          },
          {
            path: "/Venues/:id",
            element: <ViewVenues />
          }
        ]
      },
      {
        path: '/Orders',
        children:[
          {
            path: '/Orders',
            element: <OrderList/>,
          },
        ]
      },
      {
        path: '/Couriers',
        children:[
          {
            path: '/Couriers',
            element: <CouriersList/>,
          },
          {
            path: "/Couriers/Insert-Couriers",
            element: <InsertCouriers />
          },
          {
            path: "/Couriers/:id",
            element: <ViewCourier/>
          },
          {
            path: "/Couriers/CouriersAction/:id",
            element: <CourierAction />
          }
        ]
      },
    ]
  },
]);

function App() {
  return <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>;
}

export default App;
