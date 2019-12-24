import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
class UserLogin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        
        axios.post('https://ticket-master-saikat.herokuapp.com/api/users/login',formData)
        .then((response)=>{
            //console.log('response',response)
            if(response.data.error){
                swal('Invalid UserName/Password')
            }
            else{
                const token=response.data
                //console.log(token)
                localStorage.setItem('authToken',token)
                this.props.history.push('/')
                swal('Logged In Successfully')
                window.location.reload()
                
            }
        })

    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div className="container">
                <br /><br />
                <h3 className="lead">Login</h3>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>
                    <input type="text" className="form-control"
                    placeholder="Email" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label><br />
                    <label>
                    <input type="password" className="form-control"
                    placeholder="Password" value={this.state.password} onChange={this.handleChange} name="password" />
                    </label><br />
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }

}
export default UserLogin