import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const StoreLocationContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const StoreLocationProvider = (props) => {
    const [storeLocations, setStoreLocations] = useState([])

  

    const getStoreLocations = () => {
        return fetch("http://localhost:8088/storeLocations")
            .then(res => res.json())
            .then(setStoreLocations)
    }

    const addStoreLocation = storeLocation => {
        return fetch("http://localhost:8088/storeLocations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(storeLocation)
        })
            .then(getStoreLocations)
    }

    const removeStoreLocation = storeLocationId => {
        return fetch(`http://localhost:8088/storeLocations/${storeLocationId}`, {
            method: "DELETE"
        })
            .then(getStoreLocations)
    }

    /*
        Load all storeLocations when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getStoreLocations()
    }, [])

    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [storeLocations])

    return (
        <StoreLocationContext.Provider value={{
            storeLocations, addStoreLocation, removeStoreLocation
        }}>
            {props.children}
        </StoreLocationContext.Provider>
    )
}