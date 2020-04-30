import React, { useContext } from "react"
import "./StoreLocation.css"
import { StoreLocationContext } from "./StoreLocationProvider" //importing context object from Provider
import StoreLocation from "./StoreLocation"

export default () => {

    //Brings in Array of Locations/ useContext() hook allows you to use data structures and functions that a parent provider component exposes
    /* use the .map() array method to iterate the array of employees and generate HTML for each one by invoking the Animal component function */
    const { storeLocations } = useContext(StoreLocationContext) //array of customers from the data provider

    return (
        <div className="storeLocations">

        {
            storeLocations.map(loc => <StoreLocation key={loc.id} location={loc} />) 
        }
        </div>
    )
}