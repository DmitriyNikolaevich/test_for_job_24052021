export const getTasksSelector = (state) => {
    return state.page.tasks
}

export const getIsAuth = (state) => {
    return state.page.isAuth
}

export const getDoneTypes = (state) => {
    return state.page.doneTypes
}

export const getToken = (state) => {
    return state.page.token
}

export const getSortOnTypes = (state) => {
    return state.page.sortOnTypes
}

export const getSortTypes = (state) => {
    return state.page.sortTypes
}

export const getSort = (state) => {
    return state.page.sortType
}

export const getSortOn = (state) => {
    return state.page.sortOn
}

export const getPage = (state) => {
    return state.page.page
}

export const getTotalTasksCount = (state) => {
    return state.page.totalTasksCount
}