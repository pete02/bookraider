import axios from 'axios'

const find=(book)=>{
    console.log(book)
    return axios.post("/api/find",book)
}

const get=(book)=>{
    return axios.post("/api/get",book)
}

export default {find,get}