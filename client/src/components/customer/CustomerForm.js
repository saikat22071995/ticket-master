import React from 'react'
import {Link} from 'react-router-dom'
//import './customerForm.css'
import axios from 'axios'
class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
            email:props.email?props.email:'',
            mobile:props.mobile?props.mobile:'',
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
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            user:this.state.user_id
        }
        this.props.handleSubmit(formData)
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div className="" >
                <form onSubmit={this.handleSubmit} className="form-group">
                    <label><input type="text" className="form-control" value={this.state.name} 
                    onChange={this.handleChange}
                    name="name" placeholder="Name"
                    required={true}/>
                    </label><br />
                    <label><input type="email" className="form-control" value={this.state.email} onChange={this.handleChange}
                    name="email" placeholder="Email" required={true}/></label><br />
                    <label><input type="text" className="form-control" value={this.state.mobile} onChange={this.handleChange}
                    name="mobile" placeholder="Phone Number" required={true}/></label><br />
                     <label>
                        <input type="hidden" className="form-control" defaultValue={this.state.user_id} 
                        name="user_id" onChange={this.handleChange} required={true} placeholder="User Id"/>
                    </label><br/>
                    <input type="submit" className="btn btn-primary"/>
                    &nbsp;<Link to="/customers" className="btn btn-primary">Back</Link>
                </form>
            </div>
        )
    }
}
export default CustomerForm