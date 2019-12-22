import React from 'react'
import axios from 'axios'
class DepartmentAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
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

    handelChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handelSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            user:this.state.user_id
        }
        this.props.handelSubmit(formData)
    }

    render(){
        return(
            <React.Fragment>
                <form className="form-group" onSubmit={this.handelSubmit}>
                    <p className="lead">Add Department</p>
                    <label className="lead">
                        <input type="text" className="form-control"
                        placeholder="Department" value={this.state.name} onChange={this.handelChange} name="name"
                        required={true}/>
                        </label><br />
                        <label>
                        <input type="hidden" className="form-control" defaultValue={this.state.user_id} 
                        name="user_id" onChange={this.handleChange} required={true} placeholder="User Id"/>
                    </label><br/>
                        <input type="submit" className="btn btn-primary"/>
                </form>
            </React.Fragment>
        )
    }
}
export default DepartmentAdd