import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
class UserRegister extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            email:'',
            password:''
        }

    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formdata={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('http://icket-master-saikat.herokuapp.com/users/register',formdata)
        .then((response)=>{
            console.log(response.data)
            console.log(this.props)
            if(response.data.hasOwnProperty('errors')){
                swal(response.data.message)
            }
            else{
                swal('User Registered Successfully')
                this.props.history.push('./login')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    handleChange=(e)=>{
        //console.log(e.target.name,e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }

    render(){
        return(
            <div>
                <br />
                <form onSubmit={this.handleSubmit} className="form-group">
                    <label>UserName:
                    <input type="text" className="form-control" required={true} value={this.state.username} onChange={this.handleChange} name="username"  />
                    </label><br />
                    <label>Email:
                    <input type="email" className="form-control" required={true} value={this.state.email} onChange={this.handleChange} name="email" />
                    </label><br />
                    <label>Password:&nbsp;
                    <input type="password" className="form-control" required={true} value={this.state.password} onChange={this.handleChange} name="password" />
                    </label><br />
                    <input type="submit"  className="btn btn-primary"/>
                    </form>
            </div>
        )
    }

}
export default UserRegister