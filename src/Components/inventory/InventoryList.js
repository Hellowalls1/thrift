import React, { useContext, useState, useEffect } from "react"
import { InventoryItemContext } from "./InventoryProvider" //importing context object from Provider
import { ItemTypeContext } from "./ItemTypeProvider"
import { StoreLocationContext } from "../location/StoreLocationProvider"
import { Button, Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap"
import InventoryItem from "./InventoryItem"
import InventoryItemForm from "./InventoryItemForm"
import "./Inventory.css"


export default (props) => {

    // const  { users } = useContext(UserContext)
    const { inventoryItems } = useContext(InventoryItemContext)
    const { itemTypes } = useContext(ItemTypeContext)
    const { storeLocations } = useContext(StoreLocationContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    
    
    //setting the activeUser to the current user in local storage
    const activeUser = parseInt(localStorage.getItem("thrift_customer"))
    
    //THE PURPOSE OF THE CODE BELOW IS TO CREATE A NEW ARRAY OF OBJECTS BASED ON ALL OF THE MAPS AND FILTERS
    //SO THAT IT CAN GET CALLED AND MAPPED OVER IN THE RETURN
    
    //constructs a new array of storeLocations who have a userId === current user
    const userLocations = storeLocations.filter(loc => loc.userId === activeUser) //returning a new array of filter store locations and defining in a variable
    
    
    
    const currentUserInventory = inventoryItems.filter(il => { 
        if (userLocations.some(ul => il.locationId === ul.id)) {
            return true 
            } else {
            return false
            } 

    
}) || [] 

console.log(currentUserInventory)

  const [filtered, setFiltered] = useState([])

 
    useEffect(() => {
      setFiltered(currentUserInventory)
     },[])
    useEffect(() => {
        if (filtered === []) {
      setFiltered(currentUserInventory)}

        },[userLocations, inventoryItems])

  const filterTheInventory = idChosen => {
    const filteredUserInventory = currentUserInventory.filter(ci => ci.itemTypeId === idChosen)
    setFiltered(filteredUserInventory)

  }
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const dropdownToggle = () => setDropdownOpen(prevState => !prevState);


    return (
        <>
        <Button onClick={toggle}>Add an Item</Button>
        <div className="inventoryItems">

        <Dropdown 
         isOpen={dropdownOpen} toggle={dropdownToggle}>
        <DropdownToggle caret>
        Display
        </DropdownToggle>

        <DropdownMenu>
        <DropdownItem onClick={e => { 
                        e.preventDefault()
                        setFiltered(currentUserInventory)}}
                        > All Items </DropdownItem>
  {
            itemTypes.map (type => {
                
                return (
                    <DropdownItem onClick={e => { 
                        e.preventDefault()
                        filterTheInventory(type.id) //setting the filtered to the id of the type that is selected from dropdoiwn
                        console.log(type.id)
                     }} value={type.id}>{type.type}</DropdownItem>
                    )
                }
                )}

        </DropdownMenu>
    
    </Dropdown>


        {/* Mapping over only the current user inventory array that was created above */}
        
        {       
               filtered.map(inv => {
                   const matchingItemType = itemTypes.find(type => type.id === inv.itemTypeId) 
                   const theLocations = storeLocations.find(s => s.id === inv.locationId) || {} 
                   
                   return <InventoryItem key={inv.id}
                   newType={matchingItemType}
                   location={theLocations}
                   inventoryItem={inv} />
                   
                })
                
            }
      
            </div>
              
       {/* This is the modal for adding inventory item */}

        <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    
                </ModalHeader>
                <ModalBody>
                    <InventoryItemForm toggler={toggle} />
                </ModalBody>
            </Modal>
          </>
    
    
    )
}