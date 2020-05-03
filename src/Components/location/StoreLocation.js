import React, { useContext, useState } from "react"
import { StoreLocationContext } from "./StoreLocationProvider"
import { Button } from  "reactstrap"

export default ({ storeLocation }) => {

//pulling in all of my store locations and my DELETE
const { storeLocations, removeStoreLocation } = useContext(StoreLocationContext)
const [ setStoreLocations] = useState({storeLocation: {id: 0}, name: null, address: null, storeHours: null})

 return (
    <section className="store">
        
        <h3 className="store__name">{storeLocation.name}</h3>
        <div className="store__address">Address: {storeLocation.address}</div>
        <div className="store__hours">Store Hours: {storeLocation.storeHours}</div>
        <Button color="danger" onClick={() => {

        removeStoreLocation(storeLocation.id) //utilizing the delete from the provider and passing the storeLocation id
        setStoreLocations({ storeLocations }) //repopulating the page with the new store locations
}}>Delete</Button>

  
    </section>

  )  } 