import React from 'react'
import axios from 'axios'
import EmployeeForm from './EmployeeForm'

class EmployeeEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            employee:{}
        }
    }

    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const employee=response.data
            console.log(employee)
            this.setState({employee})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handelSubmit=(formData)=>{
        axios.put(`http://dct-ticket-master.herokuapp.com/employees/${this.state.employee._id}`,formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            //console.log(response)
            const employee=response.data

            alert('employee Updated Successfully')
            this.props.history.push(`/employees/${employee._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                {Object.keys(this.state.employee).length!==0 && <EmployeeForm {...this.state.employee} handelSubmit={this.handelSubmit}/>}
                
            </div>
        )
    }
}
export default EmployeeEdit