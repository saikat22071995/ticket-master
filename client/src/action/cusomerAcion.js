import axios from '.././config/config'
import swal from 'sweetalert'

export const setCustomers=(customers)=>{
    return{
        type:'SET_CUSTOMERS',
        payload:customers
    }
}

export const startSetCustomers=()=>{
    return (dispatch)=>{
        axios.get('/customers', {
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then((response)=>{
                const customers=response.data
                console.log(customers)
                dispatch(setCustomers(customers))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const removeCustomer=(id)=>{
    return {
        type:'REMOVE_CUSTOMER',
        payload:id
    }
}

export const startRemoveCustomer=(id)=>{
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
                axios.delete(`/customers/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    dispatch(removeCustomer(id))
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


export const addCustomer=(customer)=>{
    return {
        type:'ADD_CUSTOMER',
        payload:customer
    }
}

export const startAddCustomer=(formData,props)=>{
    return (dispatch)=>{
        axios.post('/customers',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors.message}`)
            }else{
                const customer=response.data
                console.log(customer)
                dispatch(addCustomer(customer))
                props.history.push(`/customers/${customer._id}`)
                swal('Customer Added Successfully')
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const editCustomer=(customer)=>{
    return {
        type:'EDIT_CUSTOMER',
        payload:customer
    }
}

export const startEditCustomer=(formData,props)=>{
    return (dispatch)=>{
        axios.put(`/customers/${props.match.params.id}`,formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            //console.log(response)
            const customer=response.data
            dispatch(editCustomer(customer))
            swal('Customer Updated Successfully')
            props.history.push(`/customers/${customer._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
}