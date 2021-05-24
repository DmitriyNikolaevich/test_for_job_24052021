import { instance } from '../API'

export const pageAPI = {
    getTasks(getTasksParams) {
        return instance.get(`/?developer='Дмитрий Каплун'&sort_field=${getTasksParams.sort}&sort_direction=${getTasksParams.dir}&page=${getTasksParams.page}`).then(res => res.data)
    },
    postTask(task) {
        return instance.post(`/create?developer='Дмитрий Каплун'`, task).then(res => res.data)
    },
    login(authData) {
        return instance.post(`/login?developer='Дмитрий Каплун'`, authData).then(res => res.data)
    },
    changeTask(task) {
        return instance.post(`/edit/${Number(task.get('id'))}?developer='Дмитрий Каплун`, task).then(res => res.data)
    }
}