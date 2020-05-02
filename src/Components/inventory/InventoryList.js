import React, { useContext, useState } from "react"
import { InventoryItemContext } from "./InventoryProvider" //importing context object from Provider
import { ItemTypeContext } from "./ItemTypeProvider"
import { Button} from "reactstrap"
import InventoryItem from "./InventoryItem"



export default () => {

    // const { storeLocations } = useContext(StoreLocationContext) 
    // const  { users } = useContext(UserContext)
    const { inventoryItems } = useContext(InventoryItemContext)
    const { itemTypes } = useContext(ItemTypeContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    // const activeUser = parseInt(localStorage.getItem("thrift_customer"))

    // const userLocations = storeLocations.filter(loc => loc.userId === activeUser) 
    
    return (
        <>
        <Button onClick={toggle}>Add an Item</Button>
        <div className="inventoryItems">

        {
               inventoryItems.map(inv => {
                  const matchingItemType = itemTypes.find(type => type.id === inv.itemTypeId)
               
              return <InventoryItem key={inv.id}
              type={matchingItemType}
              inventoryItem={inv} />
                })
        }) 
        
    }
      
        </div>
          </>
    )
}