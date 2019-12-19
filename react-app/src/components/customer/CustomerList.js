import React from 'react'
//import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startRemoveCustomer} from '../../action/cusomerAcion'
//import {Image,Container,Row,Col} from 'react-bootstrap'
function CustomerList(props){

    const handelRemove=(id)=>{
        props.dispatch(startRemoveCustomer(id))
    }
        return(
            <div className="container" align="center">
                <div className="row">
                    <div className="col-md-6">
                <br />
                <p className="lead">Listing customers--{props.customers.length}</p>
                {
                    props.customers.length==0?(
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ):(
                        <table className="table table-hover">
                    <thead className="">
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>MOBILE</th>
                            <th colSpan="2">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.customers.map((customer)=>{
                                return(
                                    <tr key={customer._id}> 
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                        <td><Link className="btn btn-info" to={`/customers/${customer._id}`}>Show</Link></td>
                                        <td><button className="btn btn-danger" onClick={()=>{
                                            handelRemove(customer._id)
                                        }}>Remove</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                    )
                }
                <Link className="btn btn-outline-primary" to="/customers/new">Add Customers</Link>
                </div>
                </div>
            </div>
        )
}
const mapStateToProps=(state)=>{
    return{
        customers:state.customers
    }
}
export default connect(mapStateToProps)(CustomerList)