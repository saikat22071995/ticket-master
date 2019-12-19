import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

function DepartmentShow(props) {
    let sty={width:'18rem',backgroundColor:'grey'}
        return(
            <div>
                <br />
                {
                    !_.isEmpty(props.department) && (
                        <React.Fragment>
                             <div className="card" style={sty}>
                                <div className="card-body">
                                    <p><b><u>Department Show page</u></b></p>
                                    <label className="lead">Department_Name: {props.department.name}</label><br />
                                    <Link to={`/departments/edit/${props.department._id}`} className="btn btn-primary">Edit</Link>
                                    &nbsp;<Link to="/departments" className="btn btn-primary">Back</Link>
                                </div>
                              </div>  
                        </React.Fragment>
                    )
                }
             </div>   
        )
}
const mapStateToProps=(state,props)=>{
    return{
        department:state.departments.find(department=>department._id==props.match.params.id)
    }
}
export default connect(mapStateToProps)(DepartmentShow)