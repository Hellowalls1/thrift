import { InventoryItemContext } from "./InventoryProvider"
import { Button, Modal, ModalHeader, ModalBody} from "reactstrap"
import React, { useContext, useState } from "react"
import  { editInventoryItemForm } from "./InventoryEditForm"


//toggles the modal for the "Add Item" functionality
const [modal, setModal] = useState(false)
const toggle = () => setModal(!modal)

//toggles the edit modal
const [editModal, setEditModal] = useState(false)
const toggleEdit = () => setEditModal(!editModal)


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

        <Button color="danger" onClick={() => {
            {toggleEdit()}
        }}>Edit</Button>

    <Modal isOpen={editModal} toggle={toggleEdit}>
    <ModalHeader toggle={toggleEdit}> 
        { updatedInventoryItem.name }
    </ModalHeader>
    <ModalBody>
        <editInventoryItemForm key={updatedInventoryItem.id} inventoryItem={props.inventoryItem} type={props.type} location={props.location} toggleEdit={toggleEdit} {...updatedInventoryItem} />
    </ModalBody>
    </Modal>

    </section>
 )
}