import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startRemoveEmployee} from '../../action/employeeAction'
function EmployeeList(props){
   
    const handelRemove=(id)=>{
        props.dispatch(startRemoveEmployee(id))
    }
        return(
            <div className="container">
                <br />
                <p className="lead">Listing Employees--{props.employees.length}</p>
                {
                    props.employees.length==0?(
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ):(
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>MOBILE</th>
                                    <th>DEPARTMENT</th>
                                    <th colSpan="2">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.employees.map((employee)=>{
                                        return(
                                            <tr key={employee._id}>
                                                <td>{employee.name}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.mobile}</td>
                                                <td>{employee.department.name}</td>
                                                <td><Link to={`/employees/${employee._id}`} className="btn btn-info">Show</Link></td>
                                                <td><button className="btn btn-danger" onClick={()=>{
                                                    handelRemove(employee._id)
                                                }}>Remove</button></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                    )
                }
                
                <Link to="/employees/new" className="btn btn-primary">Add Employee</Link>
            </div>
        )
}
const mapStateToProps=(state)=>{
    return{
        employees:state.employees
    }
}
export default connect(mapStateToProps)(EmployeeList)