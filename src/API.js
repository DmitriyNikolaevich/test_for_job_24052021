import Axios from "axios"


export const instance = Axios.create({
    withCredentials: false,
    baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2',
    headers: {'Content-Type': 'multipart/form-data' }
})