import React from 'react'

class DepartmentAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:''
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
            name:this.state.name
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
                        placeholder="Department" value={this.state.name} onChange={this.handelChange} name="name"/>
                        </label><br />
                        <input type="submit" className="btn btn-primary"/>
                </form>
            </React.Fragment>
        )
    }
}
export default DepartmentAdd