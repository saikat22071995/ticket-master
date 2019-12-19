const departmentInitialState=[]

const departmentsReducer=(state=departmentInitialState,action)=>{
    switch(action.type){
        case 'SET_DEPARTMENTS':{
            return [...action.payload]
        }
        case 'ADD_DEPARTMENT':{
            return [...state,action.payload]
        }
        case 'REMOVE_DEPARTMENT':{
            return state.filter(department=>department._id!=action.payload)
        }
        case 'EDIT_DEPARTMENT':{
            return state.map(department=>{
                if(department._id==action.payload._id){
                    return {...action.payload}
                }else{
                    return {...department}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default departmentsReducer