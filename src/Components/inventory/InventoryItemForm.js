import React, { useContext, useRef } from "react"
import { InventoryItemContext } from "./InventoryItemProvider"
import { StoreLocationContext } from "../location/StoreLocationProvider"
import { ItemTypeContext } from "./ItemTypeProvider"
import "./StoreLocation.css"

export default props => {
    const { addInventoryItems } = useContext(InventoryItemContext)
    const { locations } = useContext(StoreLocationContext)
    const { itemTypes } = useContext(ItemTypeContext)

    const name = useRef()
    const location = useRef()
    const type = useRef()    
    const description = useRef()
    const purchasePrice = useRef()
    const salePrice = useRef()
    

    const constructNewStoreLocation = () => { 

        //SHOULD userID GET ITS VALUE FROM LOCALSTORAGE??!?!
        const userId =  parseInt(localStorage.getItem("thrift_customer"))

        //locationId === 0 is the "choose" message that is displaying 
        if (userId === 0) {
            window.alert("Please select a shopper")
        } else {
            
            //addEmployee is the defined variable to represent the POST function in the employee data provider 
            addStoreLocation({
                name: name.current.value,
                address: address.current.value,
                storeHours: storeHours.current.value,
                userId: userId,
               })
            .then(props.toggler)
        }
    }

    return (
        <form className="itemForm">
            <h2 className="itemform__title">New Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemName"> Item Name: </label>
                    <input
                        type="text"
                        id="itemName"
                        ref={name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Item Name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Purchase Location: </label>
                    <select
                        defaultValue=""
                        name="location"
                        ref={location}
                        id="purchaseLocation"
                        className="form-control"
                    >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Item Type: </label>
                    <select
                        defaultValue=""
                        name="type"
                        ref={type}
                        id="itemType"
                        className="form-control"
                    >
                        <option value="0">Select a Type</option>
                        {itemTypes.map(i => (
                            <option key={i.id} value={i.id}>
                                {i.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemDescription">Description: </label>
                    <input
                        type="text"
                        id="itemDescription"
                        ref={description}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Item Description"
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="purchasePrice">Purchase Price: </label>
                    <input
                        type="text"
                        id="purchasePrice"
                        ref={purchasePrice}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Purchase Price"
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="salePrice">Sale Price: </label>
                    <input
                        type="text"
                        id="salePrice"
                        ref={salePrice}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Sale Price"
                    />
                </div>
            </fieldset>
      
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewStoreLocation()
                    }
                }
                className="btn btn-primary">
                Save Location
            </button>
        </form>
    )
}
