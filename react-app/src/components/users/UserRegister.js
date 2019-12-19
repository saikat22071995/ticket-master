import React from 'react'
import axios from 'axios'
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
        axios.post('http://dct-ticket-master.herokuapp.com/users/register',formdata)
        .then((response)=>{
            console.log(response.data)
            console.log(this.props)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                alert('User Registered Successfully')
                this.props.history.push('./users/UserLogin')
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
                <form onSubmit={this.handleSubmit}>
                    <label>UserName:
                    <input type="text" value={this.state.username} onChange={this.handleChange} name="username" />
                    </label><br />
                    <label>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label><br />
                    <label>Password:&nbsp;
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                    </label><br /><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="submit" />
                    </form>
            </div>
        )
    }

}
export default UserRegister