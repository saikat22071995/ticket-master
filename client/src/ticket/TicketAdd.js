import React from 'react'
import TicketForm from './TicketForm'
import axios from 'axios'

class TicketAdd extends React.Component{
    handelSubmit=(formData)=>{
        axios.post('http://localhost:3025/tickets',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.errors){
               console.log(response)
            }
            else{
                alert('Ticket Added Successfully')
                window.location.reload()
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render()
    {
        return(
            <div>
                Add Ticket
                <TicketForm handelSubmit={this.handelSubmit}/>
            </div>
        )
    }
}
export default TicketAdd