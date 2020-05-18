import { InventoryItemContext } from "./InventoryProvider"
import { Button, Modal, ModalHeader, ModalBody, Card, CardTitle, CardText} from "reactstrap"
import React, { useContext, useState } from "react"
import {EditInventoryItemForm} from "./InventoryEditForm"



//toggles the edit modal


export default (props) => {
    const {  removeInventoryItem } = useContext(InventoryItemContext)
    
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

 return (

    <div className="shadow-lg p-3 mb-5 bg-white rounded" className="inventoryItem">
<Card body inverse color="primary" >

     <CardTitle className="inventory__name">{props.inventoryItem.name}</CardTitle>   
       <CardText   className="inventory__location">Purchased @ {props.location.name}</CardText>
       <CardText className="inventory__type">Item Type: {props.newType.type}</CardText>
       <CardText   className="inventory__description">Description: {props.inventoryItem.description}</CardText>
       <CardText   className="inventory__purchasePrice">Purchase Price: {props.inventoryItem.purchasePrice}</CardText>
       <CardText   className="inventory__forSale">For Sale ? : {props.inventoryItem.forSale ? "Yes" : "No"}</CardText>
       <CardText   className="inventory__salePrice">Sale Price: {props.inventoryItem.salePrice}</CardText>
       <CardText    className="inventory__timePurchased">Time Purchased: {props.inventoryItem.timeStamp}</CardText>
       <Button className="deleteButton" color="light" onClick={() => {
            removeInventoryItem(props.inventoryItem.id) 
        }}>Delete</Button>

        <Button color="light" onClick={() => {
            {toggleEdit()}
        }}>Edit</Button>

        </Card>


    <Modal isOpen={editModal} toggle={toggleEdit}>
    <ModalHeader toggle={toggleEdit}> 
        { props.inventoryItem.name }
    </ModalHeader>
    <ModalBody>
        <EditInventoryItemForm key={props.inventoryItem.id} inventoryItem={props.inventoryItem}
      toggleEdit={toggleEdit}  />
    </ModalBody>
    </Modal>

    </div>
 )
}