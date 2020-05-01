import React from "react"

// when we use  component in StoreLocationList, react takes the keys passed to the StoreLocation component and puts it into one object

import { Button } from  "reactstrap"

export default ({ storeLocation, user }) => (
    <section className="store">
        
        <h3 className="store__name">{storeLocation.name}</h3>
        <div className="store__address">Address: {storeLocation.address}</div>
        <div className="store__hours">Store Hours: {storeLocation.storeHours}</div>
       

        <Button>Delete</Button>
    </section>
    
)