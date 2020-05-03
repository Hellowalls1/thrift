import React from "react"


export default ({ inventoryItem, type, location }) => (
    <section className="inventoryItem">

        <h3 className="inventory__name">{inventoryItem.name}</h3>
        <div className="inventory__type">Item Type: {type.type}</div>
        <div className="inventory__location">Purchased @ {location.name}</div>
        <div className="inventory__description">Description: {inventoryItem.description}</div>
        <div className="inventory__purchasePrice">Purchase Price: {inventoryItem.purchasePrice}</div>
        <div className="inventory__forSale">For Sale ? : {inventoryItem.forSale ? "true" : "false"}</div>
        <div className="inventory__salePrice">Sale Price: {inventoryItem.salePrice}</div>
        <div className="inventory__timePurchased">Time Purchased: {inventoryItem.time}</div>
    </section>
)