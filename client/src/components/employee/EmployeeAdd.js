import React from 'react'
import EmployeeForm from './EmployeeForm'
import{connect} from 'react-redux'
import { startAddEmployee } from '../../action/employeeAction'

function EmployeeAdd(props){
  const handelSubmit=(formData)=>{
        props.dispatch(startAddEmployee(formData,props))
    }

        return(
            <div>
                <h2>Add Employee</h2>
                <EmployeeForm handelSubmit={handelSubmit}/>
            </div>
        )
}
export default connect()(EmployeeAdd)