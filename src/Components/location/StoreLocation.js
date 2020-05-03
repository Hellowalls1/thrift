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
  
    </section>

  )  } 