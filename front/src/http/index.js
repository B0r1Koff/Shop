import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:8081/'
})

export {$host}