
import React, { useContext, useState, useEffect } from "react"
import { InventoryItemContext } from "./InventoryProvider"
import { StoreLocationContext } from "../location/StoreLocationProvider"
import { ItemTypeContext } from "./ItemTypeProvider"
import "./Inventory.css"

export const EditInventoryItemForm = ({ inventoryItem, type, location, forSale, toggleEdit }) => { //these are coming from the representation
    
    const { itemTypes } = useContext(ItemTypeContext)
    const { storeLocations } = useContext(StoreLocationContext)
    

    //udate function being pulled from provider
    const { updateInventoryItem } = useContext(InventoryItemContext)
    
    const [ updatedInventoryItem, setInventoryItems] = useState(inventoryItem)
    const [ ifForSale, setIfForSale] = useState() //tracking if the box is checkend
    
    
    const newUserId =  parseInt(localStorage.getItem("thrift_customer"))
    const userDependentLocations = storeLocations.filter(i => i.userId === newUserId )
    
    
    
    // Separate state variable to track the inventoryItem as it is edited 
    //updatedInventoryItem is the state variable & setInventoryItems is function from provider

    
    /*
    When changing a state object or array, always create a new one
    and change state instead of modifying current one
    */

    //checking to see if this is a checkbox 
   const handleControlledInputChange = (event) => {
    if (event.target.name === "ifForSale") { //if for sale is the name of the fieldset
        const newInventoryItem = Object.assign({}, updatedInventoryItem)
        newInventoryItem[event.target.name] = event.target.checked
        setInventoryItems(newInventoryItem)
   } else {
     const newInventoryItem = Object.assign({}, updatedInventoryItem)
       newInventoryItem[event.target.name] = event.target.value
    setInventoryItems(newInventoryItem)
}}

//need a useEffect in the edit form to listen for if the "ifForSale" checkbox has changed line 46-54

//bringing the original value of the checkbox 
    useEffect(()=> {
        setIfForSale(inventoryItem.ifForSale)
        },[])

//will change the value of ifForSale to new selection
    useEffect(()=> {
    setIfForSale(updatedInventoryItem.ifForSale)
    },[updatedInventoryItem])

   
   const editInventoryItem = () => {
       
    
    const itemType = parseInt(type.current.value)
    const selectedLocationId = parseInt(location.current.value)
        
        updateInventoryItem({
            name: updatedInventoryItem.value,
            itemTypeId: itemType,
            locationId: selectedLocationId,
            description: updatedInventoryItem.description,
            purchasePrice: updatedInventoryItem.purchasePrice,
            forSale: updatedInventoryItem.forSale.current.checked,
            salePrice: updatedInventoryItem.salePrice,
            timeStamp: new Date(),
            
    

            
            
        })
        .then(toggleEdit)
        }
    

    return (
        <form className="itemEditForm">
        <fieldset>
            <div className="editForm-group">
                <label htmlFor="name">Item Name: </label>
                <input type="text" name="name" required autoFocus className="form-control"
                    placeholder="Item Name"
                    defaultValue="inventoryItem.name"
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Location: </label>
                <select name="type" className="form-control"
                    defaultValue={inventoryItem.type}
                    onChange={handleControlledInputChange}>

                    <option value="0">Select a Type</option>
                    {itemTypes.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="location">Purchase Location: </label>
                <select name="location" className="form-control"
                    defaultValue={inventoryItem.location}
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
                <input type="text" name="itemDescription" disabled className="form-control"
                    defaultValue={inventoryItem.itemDescription}
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="purchasePrice">Purchase Price: </label>
                <input type="text" name="purchasePrice" required autoFocus className="form-control"
                    placeholder="Enter Price"
                    defaultValue=""
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="purchasePrice">Purchase Price: </label>
                <input type="text" name="purchasePrice" required autoFocus className="form-control"
                    placeholder="Enter Price"
                    defaultValue=""
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="forSale">Select if Item is For Sale: </label>
                <input type="checkbox" name="ifForSale" required autoFocus className="form-control"
                    checked={ifForSale}
                    placeholder="Is it for Sale?"
                    defaultValue=""
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="salePrice">Sale Price: </label>
                <input type="text" name="salePrice" required autoFocus className="form-control"
                    placeholder="Enter Price"
                    defaultValue=""
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