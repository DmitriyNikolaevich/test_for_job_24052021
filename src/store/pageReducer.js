import {put, call, takeEvery, select} from 'redux-saga/effects'
import { pageAPI } from '../API/pageAPI'
import { getPage, getSort, getSortOn } from './pageSelectors'

const SET_TASKS_AC = 'test_for_job/page/SET_TASKS_AC'
const GET_TASKS_SAGA = 'test_for_job/page/GET_TASKS_SAGA'
const SET_GET_ERROR = 'test_for_job/page/SET_GET_ERROR'
const POST_NEW_TASK_SAGA = 'test_for_job/page/POST_NEW_TASK_SAGA'
const SET_POST_ERROR = 'test_for_job/page/SET_POST_ERROR'
const SET_POST_LOGIN_ERROR = 'test_for_job/page/SET_POST_LOGIN_ERROR'
const SET_POST_CHANGE_ERROR = 'test_for_job/page/SET_POST_CHANGE_ERROR'
const POST_LOGIN_SAGA = 'test_for_job/page/POST_LOGIN_SAGA'
const POST_CHENGE_TASK_SAGA_AC = 'test_for_job/page/POST_CHENGE_TASK_SAGA_AC'
const SET_RECIEVED_NEW_DATA = 'test_for_job/page/SET_RECIEVED_NEW_DATA'
const SET_TOKEN_AC = 'test_for_job/page/SET_TOKEN_AC'
const SET_IS_AUTH = 'test_for_job/page/SET_IS_AUTH'
const SET_SORT_ON_AC = 'test_for_job/page/SET_SORT_ON_AC'
const SET_SORT_TYPE_AC = 'test_for_job/page/SET_SORT_TYPE_AC'
const SET_PAGE_AC = 'test_for_job/page/SET_PAGE_AC'
const SET_TOTAL_TASKS_COUNT = 'test_for_job/page/SET_TOTAL_TASKS_COUNT'


const initialState = {
    tasks: [
        {
            id: 1,
            username: 'username',
            email: 'email',
            text: 'text',
            status: 0
        }
    ],
    errors: {
        getTasksError: '',
        postNewTaskError: '',
        postLoginError: '',
        postChengeError: ''
    },
    pagination: {

    },
    receivedNewData: false,
    token: '',
    isAuth: false,
    doneTypes: {
        '0': 'задача не выполнена',
        '1': 'задача не выполнена, отредактирована админом',
        '10': 'задача выполнена',
        '11': 'задача отредактирована админом и выполнена'
    },
    sortOnTypes: [
        {value: 'username', label: 'По имени пользователя'},
        {value: 'email', label: 'По email'},
        {value: 'status', label: 'По статусу'}
    ],
    sortTypes: [
        {value: 'asc', label: 'А - Я'},
        {value: 'desc', label: 'Я - А'}
    ],
    sortOn: 'id',
    sortType: 'asc',
    page: 1,
    totalTasksCount: 1
}

const pageReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_TASKS_AC:
            return {
                ...state,
                tasks: action.payload.tasks
            }

        case SET_GET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    getTasksError: action.payload.error
                }
            }

        case SET_POST_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    postNewTaskError: action.payload.error
                } 
            }

        case SET_POST_LOGIN_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    postLoginError: action.payload.error
                } 
            }

        case SET_POST_CHANGE_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    postChengeError: action.payload.error
                } 
            }

        case SET_RECIEVED_NEW_DATA:
            return {
                ...state,
                receivedNewData: action.payload.receivedNewDataStatus
            }

        case SET_TOKEN_AC:
            return {
                ...state,
                token: action.payload.toren
            }

        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload.isAuth
            }

        case SET_SORT_ON_AC:
            return {
                ...state,
                sortOn: action.payload.sortOn[0]
            }

        case SET_SORT_TYPE_AC:
            return {
                ...state,
                sortType: action.payload.sortType[0]
            }

        case SET_PAGE_AC:
            return {
                ...state,
                page: action.payload.page
            }

        case SET_TOTAL_TASKS_COUNT:
            return {
                ...state,
                totalTasksCount: action.payload.tasksCount
            }


        default:
            return state
    }
}

//AC

export const setTasksAC = (tasks) => ({
    type: SET_TASKS_AC, payload: { tasks }
})

export const setRecievedNewDataAC = (receivedNewDataStatus) => ({
    type: SET_RECIEVED_NEW_DATA, payload: { receivedNewDataStatus }
})

export const setTokenAC = (token) => ({
    type: SET_TOKEN_AC, payload: { token }
})

export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH, payload: { isAuth }
})

export const setSortOnAC = (sortOn) => ({
    type: SET_SORT_ON_AC, payload: { sortOn }
})

export const setSortTypeAC = (sortType) => ({
    type: SET_SORT_TYPE_AC, payload: { sortType }
})

export const setPageAC = (page) => ({
    type: SET_PAGE_AC, payload: { page }
})

export const setTotalTaskCount = (tasksCount) => ({
    type: SET_TOTAL_TASKS_COUNT, payload: { tasksCount }
})


//SAGAs errors

export const setGetError = (error) => ({
    type: SET_GET_ERROR, payload: { error }
})

export const setPostError = (error) => ({
    type: SET_POST_ERROR, payload: { error }
})

export const setPostLoginError = (error) => ({
    type: SET_POST_LOGIN_ERROR, payload: { error }
})

export const setPostChengeError = (error) => ({
    type: SET_POST_CHANGE_ERROR, payload: { error }
})

//SAGAs AC

export const getTasksSagasAC = () => ({
    type: GET_TASKS_SAGA
})

export const postNewTaskSagasAC = (newTask) => ({
    type: POST_NEW_TASK_SAGA, payload: { newTask }
})

export const postLoginSagasAC = (loginData) => ({
    type: POST_LOGIN_SAGA, payload: { loginData }
})

export const postChangeTaskSagasAC = (task) => ({
    type: POST_CHENGE_TASK_SAGA_AC, payload: { task }
})


//SAGAs

export function* getTasksSAGA() {

    const getTaskData = {
        sort: yield select(getSortOn),
        dir: yield select(getSort),
        page: yield select(getPage)
    }

    try {
        const response = yield call(pageAPI.getTasks, getTaskData)
        if (response.status === 'ok' && response.message.tasks.length !== 0) {
            yield put(setTasksAC(response.message.tasks))
            yield put(setTotalTaskCount(response.message.total_task_count))
        } else if (response.status === 'error') {
            throw new Error(response.message)
        }
    } catch (error) {
        yield put(setGetError(error))
    }
    
}

export function* postNewTaskSAGA(action) {
    try {
        const response = yield call(pageAPI.postTask, action.payload.newTask)
        if(response.status === 'error') {
            throw new Error(response.message)
        } else if(response.status === 'ok') {
            yield put(getTasksSagasAC({ sort: 'id', dir: 'asc', page: 1 }))
        }
    } catch (error) {
        yield put(postNewTaskSagasAC(error))
    }
}

export function* postLoginSAGA(action) {
    try {
        const response = yield call(pageAPI.login, action.payload.loginData)
        if (response.status === 'ok') {
            yield put(setTokenAC(response.message.token))
            yield put(setIsAuth(true))
        } else {
            throw new Error(response.message)
        }
    } catch (error) {
        yield put(setPostLoginError(error))
    }
}

export function* postChangeTaskSAGA(action) {
    try {

        const response = yield call(pageAPI.changeTask, action.payload.task)

        if(response.status === 'error') {
            throw new Error(response.message)
        } else if(response.status === 'ok') {
            yield put(getTasksSagasAC({ sort: 'id', dir: 'asc', page: 1 }))
        }
    } catch (error) {
        yield put(setPostChengeError(error))
    }
}

export function* pageRootSAGA() {
    yield takeEvery(GET_TASKS_SAGA, getTasksSAGA)
    yield takeEvery(POST_NEW_TASK_SAGA, postNewTaskSAGA)
    yield takeEvery(POST_LOGIN_SAGA, postLoginSAGA)
    yield takeEvery(POST_CHENGE_TASK_SAGA_AC, postChangeTaskSAGA)
}

export default pageReducer