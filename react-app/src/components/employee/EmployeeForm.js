import React from 'react'
import axios from 'axios'

class EmployeeForm extends React.Component{
    constructor(props){
        super()
        this.state={
            name:props.name?props.name:'',
            email:props.email?props.email:'',
            mobile:props.mobile?props.mobile:'',
            department:props.department?props.department._id:'',
            departments:[]
        }
    }
    handelChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handelSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department
        }
        this.props.handelSubmit(formData)

    }
    componentDidMount(){
        axios.get('http://dct-ticket-master.herokuapp.com/departments', {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const departments=response.data
            this.setState({departments})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        console.log(this.state.department)
        return(
            <div>
                <form onSubmit={this.handelSubmit}>
                    <label>
                        Name:<input type="text" value={this.state.name} onChange={this.handelChange} name="name" />
                    </label><br />
                    <label>
                        Email:<input type="text" value={this.state.email} onChange={this.handelChange} name="email" />
                    </label><br />
                    <label>
                        Mobile:<input type="text" value={this.state.mobile} onChange={this.handelChange} name="mobile" />
                    </label><br />
                    
                        <label>Department:<select value={this.state.department} onChange={this.handelChange} name="department" >
                        <option value="">select</option>
                        {
                            this.state.departments.map((dept,index)=>{
                                return(
                                    <option key={index} value={dept._id}>{dept.name}</option>
                                )
                            })
                        }
                    </select></label><br />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}
export default EmployeeForm