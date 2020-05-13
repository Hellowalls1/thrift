import React, { useContext, useState } from "react"
import { StoreLocationContext } from "./StoreLocationProvider"
import { Button, Card, CardTitle, CardText} from  "reactstrap"

export default ({ storeLocation }) => {

//pulling in all of my store locations and my DELETE
const { storeLocations, removeStoreLocation } = useContext(StoreLocationContext)
const [e, setStoreLocations] = useState({storeLocation: {id: 0}, name: null, address: null, storeHours: null})

 return (
  <div class="shadow-lg p-3 mb-5 bg-white rounded" className="storeLocation">

  <Card body inverse color="primary" >
    <CardTitle className="store__title">{storeLocation.name}</CardTitle>
      <CardText className="store__address">Address: {storeLocation.address}</CardText>
      <CardText className="store__hours">Hours: {storeLocation.storeHours}</CardText>

      <Button color="light" onClick={() => {
        removeStoreLocation(storeLocation.id) //utilizing the delete from the provider and passing the storeLocation id
        setStoreLocations({ storeLocations }) //repopulating the page with the new store locations
      }}>Delete</Button>

  </Card>
</div>

  )  } 


 