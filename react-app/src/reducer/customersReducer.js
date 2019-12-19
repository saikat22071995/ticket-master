const customersInitialState=[]

const customersReducer=(state=customersInitialState,action)=>{
    switch(action.type){
        case 'SET_CUSTOMERS':{
            return [...action.payload]
        }
        case 'REMOVE_CUSTOMER':{
            return state.filter(customer=>customer._id!==action.payload)
        }
        case 'ADD_CUSTOMER':{
            return [...state,action.payload]
        }
        case 'EDIT_CUSTOMER':{
            return state.map(customer=>{
                if(customer._id==action.payload._id){
                    return {...action.payload}
                }else{
                    return {...customer}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default customersReducer