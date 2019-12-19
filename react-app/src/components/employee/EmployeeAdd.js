import React from 'react'
import EmployeeForm from './EmployeeForm'
import axios from 'axios'

class EmployeeAdd extends React.Component{
    handelSubmit=(formData)=>{
        axios.post('http://dct-ticket-master.herokuapp.com/employees',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.errors){
                alert('Select Department')
            }
            else{
                alert('Employee Added Successfully')
                //window.location.reload()
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h2>Add Employee</h2>
                <EmployeeForm handelSubmit={this.handelSubmit}/>
            </div>
        )
    }
}
export default EmployeeAdd