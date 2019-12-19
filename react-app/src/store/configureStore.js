import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import customersReducer from '../reducer/customersReducer'
import departmentsReducer from '../reducer/departmentsReducer'
import employeesReducer from '../reducer/employeesReducer'
const configureStore=()=>{
    const store=createStore(combineReducers({
        customers:customersReducer,
        departments:departmentsReducer,
        employees:employeesReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore