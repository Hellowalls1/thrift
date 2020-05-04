import React, { useContext, useState } from "react"
import { InventoryItemContext } from "./InventoryProvider" //importing context object from Provider
import { ItemTypeContext } from "./ItemTypeProvider"
import { StoreLocationContext } from "../location/StoreLocationProvider"
import { Button, Modal, ModalHeader, ModalBody} from "reactstrap"
import InventoryItem from "./InventoryItem"
import InventoryItemForm from "./InventoryItemForm"
import "./Inventory.css"


export default () => {

    // const  { users } = useContext(UserContext)
    const { inventoryItems } = useContext(InventoryItemContext)
    const { itemTypes } = useContext(ItemTypeContext)
    const { storeLocations } = useContext(StoreLocationContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    //setting the activeUser to the current user in local storage
    const activeUser = parseInt(localStorage.getItem("thrift_customer"))

    //constructs a new array of storeLocations who have a userId === current user
    const userLocations = storeLocations.filter(loc => loc.userId === activeUser) //returning a new array of filter store locations and defining in a variable
    let  currentUserInventory = [] 
        userLocations.map(ul => { //mapping over the user locations
        inventoryItems.map(il => { //for each filtered location you are checking to see if the inventoryItem's location id is equal to the new userLocationId
            if (il.locationId === ul.id) {
                currentUserInventory.push(il) //pushing all of the filtere inventoryItems into a new array that fit all of the abouve conditions
            }
       })
        
    })
    console.log(currentUserInventory)
    
    
    return (
        <>
        <Button onClick={toggle}>Add an Item</Button>
        <div className="inventoryItems">

        {       
               currentUserInventory.map(inv => {
                   const matchingItemType = itemTypes.find(type => type.id === inv.itemTypeId) 
                 const theLocations = storeLocations.find(s => s.id === inv.locationId) || {} 
                   
              return <InventoryItem key={inv.id}
              type={matchingItemType}
              location={theLocations}
              inventoryItem={inv} />
                
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