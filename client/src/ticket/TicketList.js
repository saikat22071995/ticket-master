import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Chart} from 'react-google-charts'
import { Container, Row, Col } from 'reactstrap'

class TicketList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tickets:[],
            customers:[],
            departments:[],
            employees:[],
            currentlyDisplayed:{},
            query:'',
            filteredTickets: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3025/tickets', {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{ 
            const tickets=response.data
            console.log('ticket',tickets) 
            this.setState({tickets})
            this.setState({
                filteredTickets: tickets
            })
        })
        .catch((err)=>{
            console.log(err)
        })


        axios.get('http://localhost:3025/customers',{
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

        axios.get('http://localhost:3025/departments',{
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

        axios.get('http://localhost:3025/employees',{
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
    handelRemove=(id)=>{
        //console.log(id)
        const url=`http://localhost:3025/tickets/${id}`
        axios.delete(url,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
        const confirmRemove=window.confirm("Are You Sure?")
        if(confirmRemove){
            this.setState((prevState)=>{
                return{
                    //this.state.tickets.filter(emp=>emp.id!=id)
                    tickets:prevState.tickets.filter(emp=>emp._id!==id)
                }
            })
        }
        })
        .catch((err)=>{
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

    findDepartment = (id) => {
        return this.state.departments.find(dept => dept._id === id)
    }

    calculate(){
        const allTickets = this.state.tickets.length
        const completedTickets = this.state.tickets.filter(ticket=>ticket.isResolved).length
        const percent = Math.round((completedTickets/allTickets)*100)
        return percent
    }

    handleSubmit = (e) => {
        e.preventDefault()
    } 

    handleSearch = (e) => {
        const query = e.target.value
        console.log(query)
        this.setState((prevState)=>{
            return{
                filteredTickets:prevState.tickets.filter(ticket=>ticket.code.toLowerCase().includes(query.toLowerCase() ))
            }
            
        })
        console.log(this.state.tickets)
    }

    render(){
        const pendingTickets = this.state.tickets.filter(ticket=>!ticket.isResolved)
        const high = pendingTickets.filter(ticket=>ticket.priority === 'High').length
        const medium = pendingTickets.filter(ticket=>ticket.priority === 'Medium').length
        const low = pendingTickets.filter(ticket=>ticket.priority === 'Low').length
        const data = [
            ["Priority", "Tickets per Category"],
            ["High", high],
            ["Medium",medium],
            ["Low", low]
          ]
        const options = {
            title: "Ticket Priority",
            pieHole: 0.3,
            is3D: false
          }

        const data2 = []
        const Header = ["Departments", "Tickets", { role: "style" }]
        data2.push(Header)
            this.state.departments.map(dept=>{
                    const temp = []
                    temp.push(`${dept.name}`)
                    temp.push(pendingTickets.filter(ticket=>(ticket.department.name? ticket.department.name : this.findDepartment(ticket.department).name) === dept.name).length)
                    temp.push("blue")
                    data2.push(temp)
            })

        return(
            <div>
                <br />
                <form className="form-inline float-right mt-3 ml-3" onSubmit={this.handleSubmit}>
                    <input className="form-control mr-sm-2"  type="search"   placeholder="Search Code" aria-label="Search" onChange={this.handleSearch}/>
                </form>
                
                <p>Listing tickets--{this.state.tickets.length}</p>
                <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>CODE</th>
                            <th>CUSTOMER</th>
                            <th>DEPARTMENT</th>
                            <th>EMPLOYEE</th>
                            <th>PRIORITY</th>
                            <th>MESSAGE</th>
                            <th colSpan="3">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.filteredTickets.map((ticket)=>{
                        return(
                            <tr key={ticket._id}>
                                <td>{ticket.code}</td>
                                <td>{this.handleCustomer(ticket.customer)}</td>
                                <td>{this.handleDepartment(ticket.department)}</td>
                                <td>{this.handleEmployees(ticket.employees)}</td>
                                <td>{ticket.priorities}</td>
                                <td>{ticket.message}</td>
                                <td><Link to={`/tickets/${ticket._id}`} className="btn btn-primary">Show</Link></td>
                                <td><button onClick={()=>{
                                    this.handelRemove(ticket._id)
                                }} className="btn btn-danger">Remove</button></td>
                            </tr>
                        )
                    })
                }
                    </tbody>
                </table>
                <Link to="/tickets/new">Add Ticket</Link>
                <Container>
                    <Row>
                    <Col md="6">
                    <Chart
                    chartType='PieChart'
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                    />
                    </Col>

                    <Col md="6">
                    <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={data2}
                    options={{
                        chart: {
                            title: 'Tickets By Department',
                        }
                    }}
                     />
                    </Col> 
                </Row>
            </Container>
            </div>
        )
    }
}
export default TicketList