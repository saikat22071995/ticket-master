import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {startSetCustomers} from './action/cusomerAcion'
import {startSetDepartments} from './action/departmentAction'
import {startSetEmployees} from './action/employeeAction'
const store=configureStore()
console.log(store.getState())
store.subscribe(()=>{
    console.log(store.getState())
})

if(localStorage.getItem('authToken')){
    store.dispatch(startSetCustomers())
    store.dispatch(startSetDepartments())
    store.dispatch(startSetEmployees())
}
const jsx=(
    <div>
    <Provider store={store}>
        <App/>
    </Provider>
    </div>
)

ReactDOM.render(jsx, document.getElementById('root'));

