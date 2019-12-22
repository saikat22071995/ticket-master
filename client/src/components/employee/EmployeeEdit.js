import React from 'react'
import { connect } from 'react-redux'
import EmployeeForm from './EmployeeForm'
import { startEditEmployee } from '../../action/employeeAction'
import _ from 'lodash'
function EmployeeEdit(props) {

    const handelSubmit = (formData) => {
        props.dispatch(startEditEmployee(formData,props))
    }

    return (
        <div>
            {
                !_.isEmpty(props.employee) && (
                    <div>

                        {Object.keys(props.employee).length !== 0 && <EmployeeForm {...props.employee} handelSubmit={handelSubmit} />}
                    </div>
                )
            }


        </div>
    )
}
const mapStateToProps = (state, props) => {
    return {
        employee: state.employees.find(employee => employee._id == props.match.params.id)
    }
}
export default connect(mapStateToProps)(EmployeeEdit)