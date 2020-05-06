import React, { useContext, useRef } from "react"
import { InventoryItemContext } from "./InventoryProvider"
import { StoreLocationContext } from "../location/StoreLocationProvider"
import { ItemTypeContext } from "./ItemTypeProvider"
import "./Inventory.css"

export default props => {
    const { addInventoryItems } = useContext(InventoryItemContext)
    const { storeLocations } = useContext(StoreLocationContext)
    const { itemTypes } = useContext(ItemTypeContext)
    
    const name = useRef()
    const location = useRef()
    const type = useRef()    
    const description = useRef()
    const purchasePrice = useRef()
    const salePrice = useRef()
    const forSale = useRef()
    const time = useRef()
    
    const newUserId =  parseInt(localStorage.getItem("thrift_customer"))
    
    const userDependentLocations = storeLocations.filter(i => i.userId === newUserId )
    const constructNewItem = () => { 
        
        //SHOULD userID GET ITS VALUE FROM LOCALSTORAGE??!?!
        const itemType = parseInt(type.current.value)
        const selectedLocationId = parseInt(location.current.value)
        
        //addEmployee is the defined variable to represent the POST function in the employee data provider 

        addInventoryItems({
            name: name.current.value,
            itemTypeId: itemType,
            locationId: selectedLocationId,
            description: description.current.value,
            purchasePrice: purchasePrice.current.value,
            forSale: forSale.current.checked,
            salePrice: salePrice.current.value,
            timeStamp: new Date(),
            
    

            
            
        })
        .then(props.toggler)
        
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
                    <label htmlFor="type">Item Type: </label>
                    <select
                        defaultValue=""
                        name="type"
                        ref={type}
                        id="itemType"
                        className="form-control"
                        >
                        <option value="0">Select a Type</option>
                        {itemTypes.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.type}
                            </option>
                        ))}
                    </select>
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
                       {userDependentLocations.map(i => 
                         
                          <option key={i.id} value={i.id}>
                                {i.name}
                            </option>
                            )  }
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
                    <label htmlFor="forSale">Select if Item is For Sale: </label>
                    <input
                        type="checkbox"
                        id="forSale"
                        ref={forSale}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Is it for Sale?"
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
                        constructNewItem()
                    }
                }
                className="btn btn-primary">
                Save Item
            </button>
        </form>
    )
}
