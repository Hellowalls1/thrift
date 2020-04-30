import React from "react"

// when we use  component in AnimalList, react takes the keys passed to the Animal component and puts it into one object
export default ({animal, customer, location}) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <div className="animal__breed">{animal.breed}</div>
        <div className="animal__customer">Customer: {customer.name}</div>
        <div className="animal__location">Clinic Location: {location.name}</div>
    </section>
)