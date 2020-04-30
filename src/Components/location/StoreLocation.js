import React from "react"

// when we use  component in StoreLocationList, react takes the keys passed to the StoreLocation component and puts it into one object
export default ({ storeLocation }) => (
    <section className="store">
        <h3 className="store__name">{storeLocation.name}</h3>
        <div className="store__address">{storeLocation.address}</div>
        <div className="store__hours">Customer: {storeLocation.storeHours}</div>
    </section>
)