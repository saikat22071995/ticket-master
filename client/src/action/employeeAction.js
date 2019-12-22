import axios from '.././config/config'
import swal from 'sweetalert'
export const setEmployee=(employees)=>{
    return{
        type:'SET_EMPLOYEES',
        payload:employees
    }
}

export const startSetEmployees=()=>{
    return (dispatch)=>{
        axios.get('/employees',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const employees=response.data
            console.log(employees)
            dispatch(setEmployee(employees))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const removeEmployee=(id)=>{
    return {
        type:'REMOVE_EMPLOYEE',
        payload:id
    }
}

export const startRemoveEmployee=(id)=>{
    return (dispatch)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/employees/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    dispatch(removeEmployee(id))
                    swal("Poof! Your Data has been deleted!", {
                    icon: "success",
                  });
                })
               
            } else {
              swal("Your Data is safe!");
            }
          })
    }
}

export const editEmployee=(employee)=>{
    return {
        type:'EDIT_EMPLOYEE',
        payload:employee
    }
}

export const startEditEmployee=(formData,props)=>{
    return (dispatch)=>{
        axios.put(`/employees/${props.match.params.id}`,formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            //console.log(response)
            const employee=response.data
            console.log('employeedit',employee)
            dispatch(editEmployee(employee))
            swal('Employee Updated Successfully')
            props.history.push(`/employees/${employee._id}`)
            //window.location.reload()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addEmployee=(employee)=>{
    return {
        type:'ADD_EMPLOYEE',
        payload:employee
    }

}

export const startAddEmployee=(formData,props)=>{
    return (dispatch)=>{
        axios.post('/employees',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors.message}`)
            }else{
                const employee=response.data
                //console.log('AddEmployee',employee)
                dispatch(addEmployee(employee))
                props.history.push(`/employees/${employee._id}`)
                swal('Employee Added Successfully')
                window.location.reload()
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}