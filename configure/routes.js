const express=require('express')
const router=express.Router()
const customerController=require('../app/controllers/customerController')
const departmentController=require('../app/controllers/departmentController')
const employeeController=require('../app/controllers/employeesController')
const ticketController=require('../app/controllers/ticketsController')
const userController=require('../app/controllers/usersController')
const {authenticateUser}=require('../app/middleware/authentication')

router.get('/customers',authenticateUser,customerController.list)
router.get('/customers/:id',authenticateUser,customerController.show)
router.post('/customers/new',authenticateUser,customerController.create)
router.put('/customers/edit/:id',authenticateUser,customerController.update)
router.delete('/customers/:id',authenticateUser,customerController.destroy)


router.get('/departments',authenticateUser,departmentController.list)
router.get('/departments/:id',authenticateUser,departmentController.show)
router.post('/departments/new',authenticateUser,departmentController.create)
router.put('/departments/edit/:id',authenticateUser,departmentController.update)
router.delete('/departments/:id',authenticateUser,departmentController.destroy)


router.get('/employees',authenticateUser,employeeController.list)
router.post('/employees/new',authenticateUser,employeeController.create)
router.put('/employees/edit/:id',authenticateUser,employeeController.update)
router.get('/employees/:id',authenticateUser,employeeController.show)
router.delete('/employees/:id',authenticateUser,employeeController.destroy)


router.get('/tickets',authenticateUser,ticketController.list)
router.post('/tickets/new',authenticateUser,ticketController.create)
router.put('/tickets/edit/:id',authenticateUser,ticketController.update)
router.get('/tickets/:id',authenticateUser,ticketController.show)
router.delete('/tickets/:id',authenticateUser,ticketController.destroy)

router.post('/users/register',userController.create)
router.post('/users/login',userController.loginCreate)
router.get('/users/account',authenticateUser,userController.account)
router.delete('/users/logout',authenticateUser,userController.logout)

module.exports=router