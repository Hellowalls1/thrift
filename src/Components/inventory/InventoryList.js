import React, { useContext, useState } from "react"
import { InventoryItemContext } from "./InventoryProvider" //importing context object from Provider
import { ItemTypeContext } from "./ItemTypeProvider"
import { StoreLocationContext } from "../location/StoreLocationProvider"
import { Button, Modal, ModalHeader, ModalBody} from "reactstrap"
import InventoryItem from "./InventoryItem"
import InventoryItemForm from "./InventoryItemForm"
import "./Inventory.css"


export default () => {

    // const { storeLocations } = useContext(StoreLocationContext) 
    // const  { users } = useContext(UserContext)
    const { inventoryItems } = useContext(InventoryItemContext)
    const { itemTypes } = useContext(ItemTypeContext)
    const { storeLocations } =useContext(StoreLocationContext)
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
                  const matchingStoreLocation = storeLocations.find(store => store.id === inv.locationId
                    
                    )
              return <InventoryItem key={inv.id}
              type={matchingItemType}
              location={matchingStoreLocation}
              inventoryItem={inv} />
                })
        }) 
        
    }
      
        </div>
        <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    New Location
                </ModalHeader>
                <ModalBody>
                    <InventoryItemForm toggler={toggle} />
                </ModalBody>
            </Modal>
          </>
    )
}