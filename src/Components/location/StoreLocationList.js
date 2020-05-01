import React, { useContext, useState } from "react"
import { StoreLocationContext } from "./StoreLocationProvider" //importing context object from Provider
import StoreLocation from "./StoreLocation"
import { UserContext } from "./UserProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import  StoreLocationForm  from "./StoreLocationForm"
import "./StoreLocation.css"

export default () => {

    const { storeLocations } = useContext(StoreLocationContext) 
    const  { users } = useContext(UserContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <>
        <Button onClick={toggle}>Add A Store</Button>
        <div className="storeLocations">

        {
            storeLocations.map(loc => {
                const matchingStoreShopper = users.find(u => u.id === loc.userId)
            
            
           return <StoreLocation key={loc.id}
           user={matchingStoreShopper}
           storeLocation={loc} />
           
          
           
            }) 
        }
        </div>
        <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    New Location
                </ModalHeader>
                <ModalBody>
                    <StoreLocationForm toggler={toggle} />
                </ModalBody>
            </Modal>
        </>
    )
}