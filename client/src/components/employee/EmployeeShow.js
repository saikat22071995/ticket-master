import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import _ from 'lodash'
function EmployeeShow(props){
    
    let sty={width:'20rem',backgroundColor:'grey'}
        return(
            <div >
                <br />
                {
                    !_.isEmpty(props.employee) &&  (
                        <div className="card" style={sty}>
                            <div className="card-body">
                            <p className="lead"><b><u>Employee Show page</u></b></p>
                            <label className="lead">Name: {props.employee.name}</label><br />
                            <label className="lead">Email: {props.employee.email}</label><br />
                            <label className="lead">Mobile: {props.employee.mobile}</label><br />
                            <label className="lead">Department: {props.employee.department.name}</label><br />
                            <Link to={`/employees/edit/${props.employee._id}`} className="btn btn-primary">Edit</Link>
                            &nbsp;<Link to="/employees" className="btn btn-primary">Back</Link>
                            </div>
                        </div>
                    )
                }
             </div>   
        )
}
const mapStateToProps=(state,props)=>{
    let employee=state.employees.find(employee=>employee._id==props.match.params.id)
    //console.log('emp',employee)
    if(employee){
        return{
            employee,
            // department:state.departments.find(department=>department._id==employee.department)
        }
    }
}
export default connect(mapStateToProps)(EmployeeShow)