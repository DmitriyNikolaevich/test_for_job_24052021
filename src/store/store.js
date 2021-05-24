import { applyMiddleware, combineReducers, createStore } from "redux"
import pageReducer, { pageRootSAGA } from "./pageReducer"
import createSagaMiddleware from 'redux-saga'

let rootReducer = combineReducers({
    page: pageReducer
})

export const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(pageRootSAGA)

export default store

window.__store__ = store