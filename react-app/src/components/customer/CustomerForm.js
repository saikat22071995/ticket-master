import React from 'react'
import {Link} from 'react-router-dom'
import './customerForm.css'
class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
            email:props.email?props.email:'',
            mobile:props.mobile?props.mobile:''
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile
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
            <div className="card" >
                <form onSubmit={this.handleSubmit} className="form-group">
                    <label><input type="text" className="form-control" value={this.state.name} 
                    onChange={this.handleChange}
                    name="name" placeholder="Name"/>
                    </label><br />
                    <label><input type="text" className="form-control" value={this.state.email} onChange={this.handleChange}
                    name="email" placeholder="Email"/></label><br />
                    <label><input type="text" className="form-control" value={this.state.mobile} onChange={this.handleChange}
                    name="mobile" placeholder="Phone Number"/></label><br />
                    <input type="submit" className="btn btn-primary"/>
                    &nbsp;<Link to="/customers" className="btn btn-primary">Back</Link>
                </form>
            </div>
        )
    }
}
export default CustomerForm