import React, { useState, useEffect} from "react"
import { StoreLocationProvider } from "./location/StoreLocationProvider"
import StoreLocationList from "./location/StoreLocationList"
import { UserProvider } from "./location/UserProvider"
import "./Layout.css"
import "./Thrift.css"
import { InventoryProvider } from "./inventory/InventoryProvider"
import { ItemTypeProvider } from "./inventory/ItemTypeProvider"
import InventoryList from "./inventory/InventoryList"
import { Button } from "reactstrap"


export const Dashboard = () => {

    const [activeList, setActiveList] = useState("locations")
    const [components, setComponents] = useState()


    const showStoreLocations = () => (

        
        <StoreLocationProvider>
        <UserProvider>
            <StoreLocationList />
        </UserProvider>
        </StoreLocationProvider>
    
    )

    const showInventoryList = () => (
        
        <UserProvider>
        <StoreLocationProvider> 
        <InventoryProvider>
        <ItemTypeProvider>
            <InventoryList />
        </ItemTypeProvider>
        </InventoryProvider>
        </StoreLocationProvider>
        </UserProvider>
        )


    useEffect(() => {
        if(activeList==="inventoryList") {
            setComponents(showInventoryList)
        } else { if (activeList === "storeLocations") 
            setComponents(showStoreLocations)
    }
}, [activeList])

    return (
      
        <div className="mainContainer">
        <div className="dataContainer">
            <h1>Thrift</h1>
            <small>Keep Track of Your Shit and Occasionally Sell It To People</small>
            <div className="listContainer">
                <div className="links">
                     <Button color="primary" size="lg" onClick={() => setActiveList("storeLocations")}>Store Locations </Button> 
                     <Button color="primary" size="lg" onClick={() => setActiveList("inventoryList")}>Inventory </Button>
                </div>
                <div className="listDisplay">
                    {components}
                </div>
            </div>

        </div>
    </div>
    )

    
    
    }