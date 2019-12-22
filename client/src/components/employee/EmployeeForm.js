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
            departments:[],
            user_id:props.user_id?props.user_id:''
        }
    }
    componentDidMount(){
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

        axios.get('http://localhost:3025/departments', {
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
            department:this.state.department,
            user:this.state.user_id
        }
        this.props.handelSubmit(formData)

    }


    render(){
        console.log(this.state.department)
        return(
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                <form className="form-group" onSubmit={this.handelSubmit}>
                    <label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.handelChange}
                        placeholder="Name" name="name" />
                    </label><br />
                    <label>
                        <input type="text" className="form-control" value={this.state.email} onChange={this.handelChange}
                        placeholder="Email" name="email" />
                    </label><br />
                    <label>
                        <input type="text" className="form-control" value={this.state.mobile} onChange={this.handelChange}
                        placeholder="Mobile" name="mobile" />
                    </label><br />
                    
                        <label><select className="form-control" value={this.state.department} onChange={this.handelChange} name="department"
                        placeholder="Department" >
                        <option value="">select</option>
                        {
                            this.state.departments.map((dept,index)=>{
                                return(
                                    <option key={index} value={dept._id}>{dept.name}</option>
                                )
                            })
                        }
                    </select></label><br />
                    <label>
                        <input type="hidden" className="form-control" defaultValue={this.state.user_id} 
                        name="user_id" onChange={this.handleChange} required={true} placeholder="User Id"/>
                    </label><br/>
                    <button  className="btn btn-primary">Submit</button>
                </form>
                </div>
                </div>
            </div>
        )
    }
}
export default EmployeeForm