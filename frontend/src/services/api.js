import axios from 'axios'

const api = axios.create({
    baseURL: 'https://food-fy.herokuapp.com'
})

export default api