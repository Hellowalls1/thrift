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

    //setFiltered is what filters the items based on what item from dropDown is selected and filtered is an array of the objects selected by Id

  const [filtered, setFiltered] = useState([])

   //dropDownValue keeps track of the selected dropdown value (setDropDownValue is recording what previous dropdown selection was)
  const [dropDownValue, setDropDownValue] = useState("")

  
  //waiting for inventory items to change and when change it will filter new array of inventory items by the dropdown value that was chosen before
  useEffect(() => {
            const filteredUserInventory = currentUserInventory.filter(ci => ci.itemTypeId === dropDownValue)
            setFiltered(filteredUserInventory)
    },[inventoryItems])

    //setting the value of filtered to a new array of objects based on what Id was chosen 
  const filterTheInventory = idChosen => {
    const filteredUserInventory = currentUserInventory.filter(ci => ci.itemTypeId === idChosen)
    setFiltered(filteredUserInventory)

  }
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const dropdownToggle = () => setDropdownOpen(prevState => !prevState);


    return (
        <>
        <div className="addItemButton">
        <Button size="lg" onClick={toggle}>Add an Item</Button>
        </div>

        <div className="inventoryItems">

        <Dropdown  isOpen={dropdownOpen} toggle={dropdownToggle} >
       <div className="displayButton">
        <DropdownToggle size="lg" caret>
        Display
        </DropdownToggle>
       </div>

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
                        setDropDownValue(type.id)
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