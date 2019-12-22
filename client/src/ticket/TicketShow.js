import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class TicketShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ticket:{},
            customers:[],
            departments:[],
            employees:[]
        }
    }

    componentDidMount(){
        const id=this.props.match.params.id
        //console.log(localStorage.getItem('authToken'))
        axios.get(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
       
        .then((response)=>{
            const ticket=response.data
            console.log(ticket)
            this.setState({ticket})
        })
        .catch((err)=>{
            console.log(err)
        })

        axios.get('http://dct-ticket-master.herokuapp.com/customers',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const customers = response.data
            this.setState({customers})
        })
        .catch(err => {
            console.log(err)
        })

        axios.get('http://dct-ticket-master.herokuapp.com/departments',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const departments = response.data
            this.setState({departments})
        })
        .catch(err => {
            console.log(err)
        })

        axios.get('http://dct-ticket-master.herokuapp.com/employees',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const employees = response.data
            this.setState({employees})
        })
        .catch(err => {
            console.log(err)
        })
    }


    handleCustomer(customerId){
        const customer = this.state.customers.find(customer => customer._id === customerId)
        return customer ? customer.name : ''
    }
    handleDepartment(departmentId){
        const department = this.state.departments.find(department => department._id === departmentId)
        return department ? department.name : ''
    }

    handleEmployees = (employees) => {
        const employeeStr = []
        for(const emp of employees) {
            const employee = this.state.employees.find(employee => employee._id === emp._id)
            employeeStr.push(employee ? employee.name : '')
        }
        return employeeStr.filter(ele => ele).join(', ')
    }


    

    render(){
        //let sty={backgroundColor:'red',width:'310px', marginTop:'26px'}
        return(
            <div>
                <br />
                <Link to={`/tickets/edit/${this.state.ticket._id}`}>Edit</Link>
                <p><b><u>ticket Show page</u></b></p>
                CODE: {this.state.ticket.code}<br />
                CUSTOMER NAME: {this.handleCustomer(this.state.ticket.customer)}<br />
                DEPARTMENT NAME: {this.handleDepartment(this.state.ticket.department)}<br />
                {/* EMPLOYEE NAME: {this.handleEmployees(this.state.ticket.employees[0]._id)}<br /> */}
             </div>   
        )
    }
}
export default TicketShow