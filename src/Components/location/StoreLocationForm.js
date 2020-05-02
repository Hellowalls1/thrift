import React, { useContext, useRef } from "react"
import { StoreLocationContext } from "./StoreLocationProvider"
import "./StoreLocation.css"

export default props => {
    const { addStoreLocation } = useContext(StoreLocationContext)
    

    const name = useRef()
    const address = useRef()
    const storeHours = useRef()
    

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
        <form className="locationForm">
            <h2 className="locationForm__title">Add New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationName">Location Name: </label>
                    <input
                        type="text"
                        id="locationName"
                        ref={name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Location name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationAddress">Address: </label>
                    <input
                        type="text"
                        id="locationAddress"
                        ref={address}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Street address"
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="storeHours">Store Hours: </label>
                    <input
                        type="text"
                        id="storeHours"
                        ref={storeHours}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Store Hours"
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



