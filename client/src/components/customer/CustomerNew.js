import React from 'react'
//import axios from 'axios'
import CustomerForm from './CustomerForm'
import {connect} from 'react-redux'
import {startAddCustomer} from '../../action/cusomerAcion'
class CustomerNew extends React.Component{
   
    handleSubmit=(formData)=>{
       this.props.dispatch(startAddCustomer(formData,this.props)) 
    }
    render()
    {
        return(
            <div>
                <br />
                <h2>Add Customer</h2>
                <CustomerForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default connect()(CustomerNew)