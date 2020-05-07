
import React, { useContext, useState, useEffect } from "react"
import { InventoryItemContext } from "./InventoryProvider"
import { StoreLocationContext } from "../location/StoreLocationProvider"
import { ItemTypeContext } from "./ItemTypeProvider"
import "./Inventory.css"

export const EditInventoryItemForm = ({ inventoryItem, forSale, location, type, toggleEdit }) => { //these are coming from the representation
    
    const { storeLocations } = useContext(StoreLocationContext)
    
    
    //udate function being pulled from provider
    const { updateInventoryItem } = useContext(InventoryItemContext)
    
    
    // Separate state variable to track the inventoryItem as it is edited 
    //updatedInventoryItem is the state variable & setInventoryItems is function from provider

    const [ updatedInventoryItem, setInventoryItems] = useState(inventoryItem)

    //state that tracks if the box has been checked

    const [ ifForSale, setIfForSale] = useState() 
    
    //assigning localStorage dependent locations into a new variable 
    const newUserId =  parseInt(localStorage.getItem("thrift_customer"))
    const userDependentLocations = storeLocations.filter(i => i.userId === newUserId )
    
    const { itemTypes } = useContext(ItemTypeContext)
    
    /*
    When changing a state object or array, always create a new one
    and change state instead of modifying current one
    */
   
   //checking to see if the user has clicked and checked the checkbox in if based on event.target.name (because checkboxes be fing weird)
   //else runs second function if the event.target.name is different
   const handleControlledInputChange = (event) => {
       if (event.target.name === "forSale") { //if for sale is the name of the fieldset
        const newInventoryItem = Object.assign({}, updatedInventoryItem)
        newInventoryItem[event.target.name] = event.target.checked
        setInventoryItems(newInventoryItem)
    } else {
        const newInventoryItem = Object.assign({}, updatedInventoryItem)
       newInventoryItem[event.target.name] = event.target.value
       setInventoryItems(newInventoryItem)
}}

//need a useEffect in the edit form to listen for if the "ifForSale" checkbox has changed line 46-54

//bringing the original value of the checkbox (setting it to the default value "i.e. not for sale") 
useEffect(()=> {
    setIfForSale(inventoryItem.forSale)
},[])

//will change the value of ifForSale to new selection if user is to change it
useEffect(()=> {
    setIfForSale(updatedInventoryItem.forSale)
},[updatedInventoryItem])


const editInventoryItem = () => {
    
    //must use the new state variable for the updated inventory item (inventoryItem is passed as an argument into use State)
    //the object that you are sending to the api needs to be the Updated inventory state which is what happens in the edit form
    const itemType = parseInt(updatedInventoryItem.itemTypeId)
    const selectedLocationId = parseInt(updatedInventoryItem.locationId)
    
    updateInventoryItem({
        id: updatedInventoryItem.id,
        name: updatedInventoryItem.name,
        itemTypeId: itemType,
        locationId: selectedLocationId,
        description: updatedInventoryItem.description,
        purchasePrice: updatedInventoryItem.purchasePrice,
        forSale: updatedInventoryItem.forSale,
        salePrice: updatedInventoryItem.salePrice,
        timeStamp: new Date(),
            
    

            
            
        })
        .then(toggleEdit)
        }
    
        //"Type" must be equal to the key that is being changed
    return (
        <form className="itemEditForm">
        <fieldset>
            <div className="editForm-group">
                <label htmlFor="name">Item Name: </label>
                <input type="text" name="name" required autoFocus className="form-control"
                    placeholder="Item Name"
                    defaultValue={inventoryItem.name}
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Type: </label>
                <select name="itemTypeId" className="form-control"
                    defaultValue={inventoryItem.itemTypeId}
                    onChange={handleControlledInputChange}>

                    <option value="0">Select a Type</option>
                    {itemTypes.map(i => (
                        <option key={i.id} value={i.id}>
                            {i.type}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="location">Purchase Location: </label>
                <select name="locationId" className="form-control"
                    defaultValue={inventoryItem.locationId}
                    onChange={handleControlledInputChange}>

                    <option value="0">Select a Location</option>
                    {userDependentLocations.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="itemDescription">Description:</label>
                <input type="text" name="description" required autoFocus className="form-control"
                    defaultValue={inventoryItem.description}
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="purchasePrice">Purchase Price: </label>
                <input type="text" name="purchasePrice" required autoFocus className="form-control"
                    placeholder="Enter Price"
                    defaultValue={inventoryItem.purchasePrice}
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="forSale">Select if Item is For Sale: </label>
                <input type="checkbox" name="forSale" required autoFocus className="form-control"
                    checked={ifForSale} //
                    placeholder="Is it for Sale?"
                    defaultValue={inventoryItem.forSale}
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="salePrice">Sale Price: </label>
                <input type="text" name="salePrice" required autoFocus className="form-control"
                    placeholder="Enter Price"
                    defaultValue={inventoryItem.salePrice}
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    evt.preventDefault()
                    editInventoryItem()
                }}>
                Save Updates
            </button>
        </form>
    )
            }