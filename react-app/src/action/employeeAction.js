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