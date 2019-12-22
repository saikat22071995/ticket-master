import React from 'react'
import axios from 'axios'

export default class TicketForm extends React.Component {
   constructor(props) {
       super(props) 
       this.state = {
           code: "",
           customer: "select",
           custId:"",
           department:"select",
           depId: "",
           employ: "",
           employees: [],
           message: "",
           priorities:"",

           employeesData: [],
           departmentsData: [],
           customersData: [],
       }
   }


   componentDidMount() {
       //customers
        axios.get("http://localhost:3025/customers", {
            headers: {
                'x-auth': localStorage.getItem("authToken")
            }
        })
         .then((response) => {
             //console.log(response.data)
             const customersData = response.data
             this.setState( {customersData} )
         })
         .catch((err) => {
             alert("cust", err)
         })

      //departments
      axios.get("http://localhost:3025/departments", {
            headers: {
                'x-auth': localStorage.getItem("authToken")
            }
        })
         .then((response) => {
             //console.log(response.data)
             const departmentsData = response.data

             this.setState( {departmentsData} )
         })
         .catch((err) => {
             //alert("dept",err)\
             console.log(err)
         })
   }

   handleChange = (event) => {
       //console.log(event.target.name,event.target.value,event.target.id)
        
       //to access id through dropdown [department id]
        if(event.target.name === "department") {
            const selectedIndex = event.target.options.selectedIndex
            const id = event.target.options[selectedIndex].getAttribute('_id')
            const depId = id
            this.setState( {depId} ) 

                    //employees 
                    axios.get("http://localhost:3025/employees", {
                    headers: {
                        'x-auth': localStorage.getItem("authToken")
                    }
                    })
                    .then((response) => {
                       // console.log('emp',response.data)
        
                        const depId = this.state.depId
                       // console.log('depid',depId)
         
                        const employees = response.data
                        const employeesData = employees.filter((emp) => {
                            return emp.department._id === depId
                         })
                        //console.log("filtered emp ",employeesData) 
                        this.setState({ employeesData })
                    })
                    .catch((err) => {
                        alert("dept",err)
                    }) 
        } else if(event.target.name === "employ") {
            //const employees = []
            const selectedIndex = event.target.options.selectedIndex
            const selctedOption = event.target.options[selectedIndex].getAttribute('_id')
            const obj = {_id: selctedOption}
            this.setState((prevState) => {
                return {
                    employees : prevState.employees.concat(obj)
                }
            } )
            
        } else if(event.target.name === "customer") {
            const selectedIndex = event.target.options.selectedIndex
            const _id = event.target.options[selectedIndex].getAttribute('_id')
            const custId= _id
            this.setState({ custId })
        }
        
       this.setState({
           [event.target.name] : event.target.value
       }) 
   }

   handelSubmit = (event) => {
       event.preventDefault()
       const formData = {
           code: this.state.code,
           customer: this.state.custId,
           department: this.state.depId,
           employees : this.state.employees,
           message: this.state.message,
           priorities: this.state.priorities
       }
       console.log(formData)
       this.props.handelSubmit(formData)
   }
   
    render() {
       const priorities = ["High","Medium","Low"];
        return (
            <div>
                <form onSubmit ={this.handelSubmit}>
                    <label>
                        code <br />
                        <input type="text" value={this.state.code} name="code" onChange={this.handleChange} />
                    </label> <br />

                    <label>
                        customer <br />
                        <select value ={this.state.customer} name="customer" onChange={this.handleChange} >
                            <option disabled>select</option>
                            {   
                                this.state.customersData.map((customer) => {
                                    return (
                                        <option key={customer._id} _id={customer._id} >{customer.name}</option> 
                                    )
                                }) 
                            }
                        </select>
                    </label> <br />

                    <label>
                        Department <br />
                        <select placeholder="select" value ={this.state.department} name="department" onChange={this.handleChange} >
                            <option disabled>select</option>
                            {   
                                this.state.departmentsData.map((department) => {
                                    return (
                                        <option key={department._id} _id={department._id}>{department.name}</option> 
                                    )
                                }) 
                            }
                        </select>
                    </label> <br />

                    <label>
                        employees <br />
                        <select multiple={true} value ={this.state.employeesData.name} name="employ" onChange={this.handleChange} >
                            <option disabled>select</option>
                            {   
                                this.state.employeesData.map((employ) => {
                                    return (
                                        <option key={employ._id} _id={employ._id}>{employ.name}</option> 
                                    )
                                }) 
                            }
                        </select>
                    </label> <br />

                    <label>
                        message <br />
                        <textarea name="message" value ={this.state.message} onChange={this.handleChange} placeholder="enter your message" />
                    </label> <br />
                    
                     <label>Priorities</label>       
                    {
                        priorities.map((prio,i)=>{
                            return(
                                <label key={i} > 
                                    <input type="radio" value={prio} name="priorities" onChange ={this.handleChange} />{prio}
                                </label>
                            )
                        })
                    }
                    
                    <input type ="submit" />   
                    
                </form>
            </div>
        )
    }
}
