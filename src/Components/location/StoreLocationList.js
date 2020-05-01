import React, { useContext } from "react"
import { StoreLocationContext } from "./StoreLocationProvider" //importing context object from Provider
import StoreLocation from "./StoreLocation"
import { UserContext } from "./UserProvider"
import { Button } from  "reactstrap"
import "./StoreLocation.css"

export default () => {

    const { storeLocations } = useContext(StoreLocationContext) 
    const  { users } = useContext(UserContext)

    return (
        <>
        <Button>Add A Store</Button>
        <div className="storeLocations">

        {
            storeLocations.map(loc => {
                const matchingStoreShopper = users.find(u => u.id === loc.userId)
            
            
           return <StoreLocation key={loc.id}
           user={matchingStoreShopper}
           storeLocation={loc} />
           
          
           
            }) 
        }
        </div>
        </>
    )
}