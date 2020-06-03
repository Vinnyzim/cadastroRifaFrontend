import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cadastrorifabackend.herokuapp.com/',
})

export default api;