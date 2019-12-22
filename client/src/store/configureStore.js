import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import customersReducer from '../reducer/customersReducer'
import departmentsReducer from '../reducer/departmentsReducer'
import employeesReducer from '../reducer/employeesReducer'
import ticketReducer from '../reducer/ticketsReducer'
const configureStore=()=>{
    const store=createStore(combineReducers({
        customers:customersReducer,
        departments:departmentsReducer,
        employees:employeesReducer,
        tickets:ticketReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore