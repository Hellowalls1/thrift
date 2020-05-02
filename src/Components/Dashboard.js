import React from "react"
import { StoreLocationProvider } from "./location/StoreLocationProvider"
import StoreLocationList from "./location/StoreLocationList"
import { UserProvider } from "./location/UserProvider"
import "./Layout.css"
import "./Thrift.css"
import { InventoryProvider } from "./inventory/InventoryProvider"
import { ItemTypeProvider } from "./inventory/ItemTypeProvider"
import InventoryList from "./inventory/InventoryList"


export const Dashboard = () => (
    <>
        <h2>Thrift</h2>
        <small>Buy Junk Sell Junk.</small>

        <h2>Locations</h2>

        
        <InventoryProvider>
        <ItemTypeProvider>
        <StoreLocationProvider>
        <UserProvider>
            <StoreLocationList />
            <InventoryList />
        </UserProvider>
        </StoreLocationProvider>
        </ItemTypeProvider>
        </InventoryProvider>
    </>
)