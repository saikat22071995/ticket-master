import axios from '.././config/config'
import swal from 'sweetalert'

export const setDepartments=(departments)=>{
    return{
        type:'SET_DEPARTMENTS',
        payload:departments
    }
}

export const startSetDepartments=()=>{
    return (dispatch)=>{
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const departments=response.data
            //console.log(departments)
            dispatch(setDepartments(departments))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addDepartment=(department)=>{
    return {
        type:'ADD_DEPARTMENT',
        payload:department
    }
}

export const startAddDepartment=(formData)=>{
    return (dispatch)=>{
        axios.post('/departments',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors.message}`)
            }else{
                const department=response.data
                dispatch(addDepartment(department))
                swal('Department Added Successfully')
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}




export const removeDepartment=(id)=>{
    return {
        type:'REMOVE_DEPARTMENT',
        payload:id
    }
}

export const startRemoveDepartment=(id)=>{
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
                axios.delete(`/departments/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    dispatch(removeDepartment(id))
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



export const editDepartment=(customer)=>{
    return {
        type:'EDIT_DEPARTMENT',
        payload:customer
    }
}

export const startEditDepartment=(formData,props)=>{
    return (dispatch)=>{
        axios.put(`/departments/${props.match.params.id}`,formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            //console.log(response)
            const department=response.data
            dispatch(editDepartment(department))
            swal('department Updated Successfully')
            props.history.push(`/departments/${department._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
}