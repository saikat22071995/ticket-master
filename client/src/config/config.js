import Axios from 'axios'
const axios=Axios.create({
    baseURL:'https://ticket-master-saikat.herokuapp.com/api'
})
export default axios