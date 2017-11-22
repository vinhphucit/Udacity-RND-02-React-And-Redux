import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './../reducers'
import promise from 'redux-promise'
const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(
      thunkMiddleware,
      promise,
      loggerMiddleware
    ))
  )
}