import React from 'react'
import CustomerForm from './CustomerForm'
import _ from 'lodash'
import {connect} from 'react-redux'
import { startEditCustomer } from '../../action/cusomerAcion'

function CustomerEdit(props){

    const handleSubmit=(formData)=>{
        props.dispatch(startEditCustomer(formData,props))
    }
        return(
            <div>
                {
                    !_.isEmpty(props.customer) && (
                        <div>
                            <br />
                            <p className="lead">Edit Customer -{props.customer.name}</p>
                            
                            {Object.keys(props.customer).length!==0 && <CustomerForm {...props.customer} handleSubmit={handleSubmit} />
                            }
                        </div>
                    )
                }
            </div>
        )
}
const mapStateToProps=(state,props)=>{
    return{
        customer:state.customers.find(customer=>customer._id==props.match.params.id)
    }
}
export default connect(mapStateToProps)(CustomerEdit)