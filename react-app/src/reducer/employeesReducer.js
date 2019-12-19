const initialState=[]

const employeesReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_EMPLOYEES':{
            return [...action.payload]
        }
        case 'REMOVE_EMPLOYEE':{
            return state.filter(employee=>employee._id!=action.payload)
        }
        default:{
            return [...state]
        }
    }
}
export default employeesReducer