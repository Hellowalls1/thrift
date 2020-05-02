import React from "react"

export default ({ inventoryItem }) => (
    <section className="inventoryItem">

        <h3 className="inventory__name">{inventoryItem.name}</h3>
        <div className="inventory__type">{inventoryItem.type}</div>
        <div className="inventory__location">{inventoryItem.location}</div>
        <div className="inventory__description">Description: {inventoryItem.description}</div>
        <div className="inventory__purchasePrice">Purchase Price: {inventoryItem.purchasePrice}</div>
        <div className="inventory__forSale">For Sale?: {inventoryItem.forSale}</div>
        <div className="inventory__salePrice">Sale Price: {inventoryItem.salePrice}</div>
        <div className="inventory__timePurchased">Time Purchased: {inventoryItem.time}</div>
    </section>
)