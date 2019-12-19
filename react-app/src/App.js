import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import Home from './components/common/Home'
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserRegister from './components/users/UserRegister';
import UserLogin from './components/users/UserLogin';
import CustomerList from './components/customer/CustomerList';
import CustomerShow from './components/customer/CustomerShow';
import CustomerNew from './components/customer/CustomerNew';
import CustomerEdit from './components/customer/CustomerEdit';
import DepartmentList from './components/department/DepartmentList'
import EmployeeList from './components/employee/EmployeeList'
import EmployeeAdd from './components/employee/EmployeeAdd'
import EmployeeShow from './components/employee/EmployeeShow';
import DepartmentShow from './components/department/DepartmentShow'
import TicketList from './components/ticket/TicketList'
import TicketAdd from './components/ticket/TicketAdd'
import TicketShow from './components/ticket/TicketShow'
import DepartmentEdit from './components/department/DepartmentEdit'
import EmployeeEdit from './components/employee/EmployeeEdit'

function App(props) {
  function logout(){
    localStorage.clear()
    {window.location.assign('/users/login')}
    //window.location.reload('/login')

  }
  return (
    <BrowserRouter>
   <div className="container">
   <nav className="navbar navbar-dark bg-dark">
   <nav className="mr-auto">
    {
      localStorage.getItem('authToken')?(
        <div>
          <Link className="navbar-brand" to="/">Home</Link>
          <Link className="navbar-brand" to="/customers"> Customers </Link>
          <Link className="navbar-brand" to="/departments"> Department</Link> 
          <Link className="navbar-brand" to="/employees"> Employee</Link>  
          <Link className="navbar-brand" to="/tickets"> Tickets </Link> 
          <Link className="navbar-brand" to="/logout"> Logout</Link> 
          {/* <Link to="/logout"> Logout</Link> */}
        </div>
      ):(
        <div>
        <Link className="navbar-brand" to="/">Home</Link>
        <Link className="navbar-brand" to="/users/register"> Register </Link>
        <Link className="navbar-brand" to="/users/login"> Login</Link> 
        </div>  
      )
    }
    </nav>
    </nav>
    <Switch>
    <Route path="/" component={Home} exact={true}/>
    <Route path="/users/register" component={UserRegister}/>
    <Route path="/users/login" component={UserLogin}/>
    <Route path="/customers" component={CustomerList} exact={true}/>
    <Route path="/departments" component={DepartmentList} exact={true}/>
    <Route path="/tickets" component={TicketList} exact={true}/>
    <Route path="/customers/new" component={CustomerNew} />
    <Route path="/tickets/new" component={TicketAdd} />
    <Route path="/employees" component={EmployeeList} exact={true}/>
    <Route path="/employees/new" component={EmployeeAdd} exact={true}/>
    <Route path="/logout" component={logout} />
    <Route path="/customers/edit/:id" component={CustomerEdit}/>
    <Route path="/departments/edit/:id" component={DepartmentEdit}/>
    <Route path="/employees/edit/:id" component={EmployeeEdit}/>
    <Route path="/customers/:id" component={CustomerShow} />
    <Route path="/employees/:id" component={EmployeeShow} />
    <Route path="/departments/:id" component={DepartmentShow} />
    <Route path="/tickets/:id" component={TicketShow} />
    </Switch>
     </div>
     </BrowserRouter>
  );
}

export default App;
