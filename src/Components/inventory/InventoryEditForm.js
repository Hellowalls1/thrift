


import React, { useContext, useState } from "react"
import { EmployeeContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"






export const editEmployeeForm = ({ employee, toggleEdit }) => {
    const { locations } = useContext(LocationContext)
    const { updateEmployee } = useContext(EmployeeContext)

    // Separate state variable to track the animal as it is edited
    const [ updatedEmployee, setEmployee ] = useState(employee)

    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const handleControlledInputChange = (event) => {
        const newEmployee = Object.assign({}, updatedEmployee)
        newEmployee[event.target.name] = event.target.value
        setEmployee(newAnimal)
    }

    const editEmployee = () => {
        const locationId = parseInt(updatedEmployee.locationId)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            updateEmployee({
                id: updatedEmployee.id,
                name: updatedEmployee.name,
                address: updatedEmployee.address,
                locationId: locationId,
                customerId: parseInt(localStorage.getItem("kennel_customer"))
            })
                .then(toggleEdit)
        }
    }

    return (
        <form className="employeeForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Employee name"
                        defaultValue={employee.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Employee address: </label>
                    <input type="text" name="breed" required className="form-control"
                        placeholder="Employee adress"
                        defaultValue={employee.address}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location: </label>
                    <select name="locationId" className="form-control"
                        defaultValue={employee.locationId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    evt.preventDefault()
                    editEmployee()
                }}>
                Save Updates
            </button>
        </form>
    )
}