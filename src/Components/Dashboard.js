import React from "react"
import { StoreLocationProvider } from "./location/StoreLocationProvider"
import StoreLocationList from "./location/StoreLocationList"
import { UserProvider } from "./location/UserProvider"
import "./Layout.css"
import "./Thrift.css"


export const Dashboard = () => (
    <>
        <h2>Thrift</h2>
        <small>Buy Junk Sell Junk.</small>

        <h2>Locations</h2>

        <StoreLocationProvider>
        <UserProvider>
            <StoreLocationList />
        </UserProvider>
        </StoreLocationProvider>
    </>
)