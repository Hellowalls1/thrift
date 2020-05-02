import React, { useContext, useState } from "react"
import { InventoryItemContext } from "./InventoryProvider" //importing context object from Provider
import { Button} from "reactstrap"
import InventoryItem from "./InventoryItem"



export default () => {

    // const { storeLocations } = useContext(StoreLocationContext) 
    // const  { users } = useContext(UserContext)
    const { inventoryItems } = useContext(InventoryItemContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    // const activeUser = parseInt(localStorage.getItem("thrift_customer"))

    // const userLocations = storeLocations.filter(loc => loc.userId === activeUser) 
    
    return (
        <>
        <Button onClick={toggle}>Add an Item</Button>
        <div className="inventoryItems">

        {
            
            //filter through the store locations array and find the location user id that is equal to the active user
            
              

            //map through the new userLocations array
         
               inventoryItems.map(inv => <InventoryItem key={inv.id}
           
          inventoryItem={inv} />
    )}) 
        
    }
      
        </div>
          </>
    )
}