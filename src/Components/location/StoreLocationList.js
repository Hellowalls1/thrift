import React, { useContext, useState } from "react"
import { StoreLocationContext } from "./StoreLocationProvider" //importing context object from Provider
import StoreLocation from "./StoreLocation"
import { UserContext } from "./UserProvider"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import  StoreLocationForm  from "./StoreLocationForm"
import "./StoreLocation.css"

export default () => {

    const { storeLocations } = useContext(StoreLocationContext) 
    const  { users } = useContext(UserContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const activeUser = parseInt(localStorage.getItem("thrift_customer"))

    const userLocations = storeLocations.filter(loc => loc.userId === activeUser) 
    return (
        <>
        <Button size="lg" onClick={toggle}>Add A Store</Button>
        <div className="storeLocations">

        {
            
            //filter through the store locations array and find the location user id that is equal to the active user
            
              

            //map through the new userLocations array
         
               userLocations.map(loc => {
                const matchingStoreShopper = users.find(u => u.id === loc.userId)
            
            
           return <StoreLocation key={loc.id}
           user={matchingStoreShopper}
           storeLocation={loc} />
           
           
           
        }) 
        
    }
        {/*       
        this is the modal that holds the StoreLocationForm
         */}
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