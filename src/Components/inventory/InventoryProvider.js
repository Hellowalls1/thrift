import React, { useState, useEffect } from "react"
/*
    The context is imported and used by individual components
    that need data
*/
export const InventoryItemContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const InventoryProvider = (props) => {
    const [inventoryItems, setInventoryItems] = useState([])

  

    const getInventoryItems = () => {
        return fetch("http://localhost:8088/inventoryItems")
            .then(res => res.json())
            .then(setInventoryItems)
    }

    const addInventoryItems = inventoryItem => {
        return fetch("http://localhost:8088/inventoryItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inventoryItem)
        })
            .then(getInventoryItems)
    }

    const removeInventoryItem = inventoryItemId => {
        return fetch(`http://localhost:8088/inventoryItems/${inventoryItemId}`, {
            method: "DELETE"
        })
            .then(getInventoryItems)
    }

    
    const updateInventoryItem = inventoryItem => {
        return fetch(`http://localhost:8088/inventoryItems/${inventoryItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inventoryItem.id)
        })
            .then(getInventoryItems) //after you update must get new list of items to display
            }

    /*
        Load all storeLocations when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getInventoryItems()
    }, [])

    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [inventoryItems])

    return (
        <InventoryItemContext.Provider value={{
            inventoryItems, addInventoryItems, removeInventoryItem, updateInventoryItem
        }}>
            {props.children}
        </InventoryItemContext.Provider>
    )
}