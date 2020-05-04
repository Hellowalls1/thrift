import { InventoryItemContext } from "./InventoryProvider"
import { Button } from "reactstrap"
import React, { useContext } from "react"


export default (props) => {
    const {  removeInventoryItem } = useContext(InventoryItemContext)

 return (

    <section className="inventoryItem">

        <h3 className="inventory__name">{props.inventoryItem.name}</h3>
        <div className="inventory__type">Item Type: {props.type.type}</div>
        <div className="inventory__location">Purchased @ {props.location.name}</div>
        <div className="inventory__description">Description: {props.inventoryItem.description}</div>
        <div className="inventory__purchasePrice">Purchase Price: {props.inventoryItem.purchasePrice}</div>
        <div className="inventory__forSale">For Sale ? : {props.inventoryItem.forSale ? "Yes" : "No"}</div>
        <div className="inventory__salePrice">Sale Price: {props.inventoryItem.salePrice}</div>
        <div className="inventory__timePurchased">Time Purchased: {props.inventoryItem.timeStamp}</div>
        <Button color="danger" onClick={() => {

removeInventoryItem(props.inventoryItem.id) 

}}>Delete</Button>

    </section>
 )
}