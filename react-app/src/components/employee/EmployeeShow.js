import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import _ from 'lodash'
function EmployeeShow(props){
   
        let sty={backgroundColor:'red',width:'310px', marginTop:'26px'}
        return(
            <div >
                {
                    !_.isEmpty(props.employee) && (
                        <div className="card">
                            <div className="card-body">
                            <Link to={`/employees/edit/${props.employee._id}`}>Edit</Link>
                            <p><b><u>Employee Show page</u></b></p>
                            Name: {props.employee.name}<br />
                            Email: {props.employee.email}<br />
                            mobile: {props.employee.mobile}<br />
                            Department: {props.department}
                            </div>
                        </div>
                    )
                }
             </div>   
        )
}
const mapStateToProps=(state,props)=>{
    return{
        employee:state.employees.find(employee=>employee._id==props.match.params.id)
    }
}
export default connect(mapStateToProps)(EmployeeShow)