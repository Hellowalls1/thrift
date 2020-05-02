import React from "react"

// when we use  component in AnimalList, react takes the keys passed to the Animal component and puts it into one object
export default ({ inventoryItem }) => (
    <section className="animal">

        <h3 className="inventory__name">{animal.name}</h3>
        <div className="inventory__type">{animal.breed}</div>
        <div className="inventory__location">{animal.breed}</div>
        <div className="inventory__description">Description: {customer.name}</div>
        <div className="inventory__purchasePrice">Purchase Price: {location.name}</div>
        <div className="inventory__forSale">For Sale?: {location.name}</div>
        <div className="inventory__salePrice">Sale Price: {location.name}</div>
        <div className="inventory__timePurchased">Time Purchased: {location.name}</div>
    </section>
)