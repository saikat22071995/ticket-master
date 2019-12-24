import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap'

function TicketItem2(props){
    const {id,code,customer,department,employees,message,priorities,handleRemove,text,isResolved,handleClick} = props
    return (
        isResolved &&
        <tr>
            <td>{code}</td>
            <td>{customer}</td>
            <td>{department}</td>
            <td>{employees}</td>
            <td>{message}</td>
            <td>{priorities}</td>
            <td><Link to={`/tickets/${id}`}><Button color="info">Show</Button></Link></td>
            <td><Button color="danger" onClick = {()=>{
                return handleRemove(id)
            }}>{text}</Button></td>
            <td><input type="checkbox" onClick= {()=> {
                return handleClick(id)
            }}/></td>
        </tr>
    )
}

export default TicketItem2