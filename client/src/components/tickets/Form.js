import React from 'react'
import axios from '../../config/config'
import Select from 'react-select'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import {connect}  from 'react-redux'


class TicketForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            code: props.ticket? props.ticket.code: '',
            customer: props.ticket? props.ticket.customer._id: '',
            department: props.ticket? props.ticket.department._id: '',
            emps: [],
            employee: props.ticket? props.ticket.employees: [],
            employeesnew: [],
            message: props.ticket? props.ticket.message: '',
            priorities: props.ticket? props.ticket.priorities: '',
            user_id:props.user_id?props.user_id:''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })

        if(e.target.name === 'department'){
                 this.setState({
                employeesnew:this.state.emps.filter(employee=>employee.deptId === e.target.value )
            })
            console.log('employeesnew', this.state.employeesnew)
        }

    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer,
            department: this.state.department,
            employees: this.state.employee,
            message: this.state.message,
            priorities: this.state.priorities,
            user:this.state.user_id
        }
        this.props.ticket && (formData.id = this.props.ticket._id)
        this.props.handleTicketSubmit(formData)
        console.log(formData)
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.ticket !== undefined){
    //     const {code,customer,department,employee,message,priorities} = nextProps.ticket
    //     this.setState({code,customer,department,employee,message,priorities})
    //     }
    // }

    componentDidMount(){

        axios.get('/employees',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employees = response.data
            let emps = []
            employees.map(employee=>{
                return (
                    emps.push({
                        id: employee._id,
                        value: employee._id,
                        label: employee.name,
                        deptId: employee.department._id,
                    })
                )
            })
            this.setState({emps})
        }) 
        
        
        axios.get('http://localhost:3025/users/account',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const user_id=response.data._id
            this.setState({user_id})
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    handleMultiChange = (option) => {
        console.log('option', option)
        if(option !== null){
            this.setState(() => {
                return {
                employee: option.map(option=>Object.assign(option.id))
             }
         })
         console.log('employee', this.state.employee)
         console.log('option', option)
        }
    }
    

    render() {
        return (
            <div>
                <div className="row">
                <div className="col-md-6">
                <Form onSubmit={this.handleSubmit}>

                <FormGroup>
                    <Label htmlFor ="code">Code</Label>
                    <Input type="text" id="code" value={this.state.code} onChange={this.handleChange} name="code"/>
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="customer">Customer</Label>
                    <Input type="select" id="customer" value={this.state.customer} onChange={this.handleChange} name="customer">
                    <option value="">select</option>
                        {this.props.customers.map(customer=>{
                             return <option key={customer._id} value={customer._id}>{customer.name} </option>
                        })}
                    </Input>
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="department">Department</Label>
                    <Input type="select" id="department" value={this.state.department} onChange={this.handleChange} name="department">
                    <option value="">select</option>
                        {this.props.departments.map(department=>{
                             return <option key={department._id} value={department._id}>{department.name}</option> 
                        })}
                    </Input>
                </FormGroup>

                <label>
                        Employees
                </label>
                            <Select
                                name="employee"
                                placeholder="Select"
                                // value={this.state.employee}
                                options={this.state.employeesnew}
                                onChange={this.handleMultiChange}
                                isMulti
                            />
                <br/>
                <FormGroup>
                <Label htmlFor="message">Message</Label>
                    <Input type="textarea" value={this.state.message} onChange={this.handleChange} name="message"/>
                </FormGroup>

        <FormGroup tag="fieldset">
        <legend>priorities</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" value="High" checked= {this.state.priorities==="High"} onChange={this.handleChange} name="priorities"/>{' '}
            High
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" value="Medium" checked= {this.state.priorities==="Medium"} onChange={this.handleChange} name="priorities"/>{' '}
            Medium
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" value="Low" checked= {this.state.priorities==="Low"} onChange={this.handleChange} name="priorities"/>{' '}
            Low
          </Label>
        </FormGroup>
      </FormGroup>
                 <br/>

                <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers,
        departments: state.departments,
        employees: state.employees
    }
}

export default connect(mapStateToProps)(TicketForm)