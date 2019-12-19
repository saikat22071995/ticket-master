import React from 'react'
import {Link} from 'react-router-dom'
import DepartmentAdd from './DepartmentAdd'
import {connect} from 'react-redux'
import {startAddDepartment} from '../../action/departmentAction'
import {startRemoveDepartment} from '../../action/departmentAction'

function DepartmentList(props){

   const handelSubmit=(formData)=>{
        props.dispatch(startAddDepartment(formData))
    }

    
   const handelRemove=(id)=>{
        props.dispatch(startRemoveDepartment(id))
    }

        let sty={width:'80%'}
        return(
            <div className="overflow:auto">
                <div className="row">
                    <div className="col-md-6">
                <p className="lead">Department Listing--{props.departments.length}</p>
                {
                    props.departments.length==0?(
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ):(
                        <table className="table table-hover" style={sty}>
                            <thead>
                                <tr>
                                    <th>DEPARTMENT NAME</th>
                                    <th colSpan="2">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.departments.map((department,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{department.name}</td>
                                                <td><Link className="btn btn-primary" to={`/departments/${department._id}`}>Show</Link></td>
                                                <td><button className="btn btn-danger" onClick={()=>{
                                                    handelRemove(department._id)
                                                }}>Remove</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> 
                    )
                }
                </div>
                <br /><br />
                <div className="col-md-6">
                    <br /><br /><br /> 
                    <DepartmentAdd handelSubmit={handelSubmit} align="right"/>
                    </div>
                </div>
            </div>
        )
}
const mapStateToProps=(state)=>{
    return{
        departments:state.departments
    }
}
export default connect(mapStateToProps)(DepartmentList)