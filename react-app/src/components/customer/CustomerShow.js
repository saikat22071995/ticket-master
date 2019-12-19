import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

function CustomerShow(props) {
    let sty={width:'18rem',backgroundColor:'grey'}
        return(
            
                <div>   
                <br />
                {
                    !_.isEmpty(props.customer)  && (
                        <div className="card" style={sty}>
                            <div className="card-body">
                                <p><b><u>Customer Show page</u></b></p>
                                Name: {props.customer.name}<br />
                                Email: {props.customer.email}<br />
                                mobile: {props.customer.mobile}<br />
                                <Link className="btn btn-primary" to={`/customers/edit/${props.customer._id}`}>Edit</Link>
                                &nbsp;<Link to="/customers" className="btn btn-primary">Back</Link>
                            </div>
                        </div>
                    )
                }
                
             </div>   
            
            
        )
}
const mapStateToProps=(state,props)=>{
    return{
        customer:state.customers.find(customer=>customer._id===props.match.params.id)
    }
}
export default connect(mapStateToProps)(CustomerShow)