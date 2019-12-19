import React from 'react'
import DepartmentAdd from './DepartmentAdd'
import {connect} from 'react-redux'
import {startEditDepartment} from '../../action/departmentAction'
import _ from 'lodash'

function DepartmentEdit(props){

    const handelSubmit=(formData)=>{
       props.dispatch(startEditDepartment(formData,props))
    }
        return(
            <div>
                {
                    !_.isEmpty(props.department) &&(
                        <div>
                            {Object.keys(props.department).length!==0 && <DepartmentAdd {...props.department}
                            handelSubmit={handelSubmit}/>}
                        </div>
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
export default connect(mapStateToProps)(DepartmentEdit)