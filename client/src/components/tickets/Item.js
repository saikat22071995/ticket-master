import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap'
// import {connect} from 'react-redux'

function TicketItem(props){
    console.log('props',props)
    const {id,code,customer,employees,department,message,priorities,handleRemove,text,isResolved,handleClick} = props
    return (
        !isResolved &&
        <tr>
            <td>{code}</td>
            <td>{customer}</td>
            <td>{department}</td>
            <td>{employees}</td>
            <td>{message}</td>
            <td>{priorities}</td>
            {/* <Link className="btn btn-primary" to={`/tickets/edit/${id}`}>Edit</Link> */}
            {/* <td><Link to={`/tickets/${id}`}><Button color="info">show</Button></Link></td> */}
            <td><Button color="danger" onClick = {()=>{
                return handleRemove(id)
            }}>{text}</Button></td>
            <td><input type="checkbox" onClick= {()=> {
                return handleClick(id)
            }}/></td>
        </tr>
    )
}
// const mapStateToProps=(state,props)=>{
//     return{
//         ticket:state.tickets.find(ticket=>ticket._id==props.match.params.id)
//     }
// }

export default TicketItem