import { createStore, applyMiddleware, compose as composeEnhancers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { createExecue } from 'redux-execue'
import { required } from 'lib/dev'


import { rootReducer } from './reducers'


const loggerOptions = {
  predicate: (getState, action) => !action.type.startsWith('@@router/'),
  collapsed: true,
}

export function configureStore({ history, initialState = {} } = required('configureStoreOptions')) {
  const connectedRouter = connectRouter(history)
  const middlewares = [
    createExecue({ log: true }),
    createLogger(loggerOptions),
    routerMiddleware(history),
  ]

  const store = createStore(
    connectedRouter(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const next = require('./reducers')

      store.replaceReducer(connectedRouter(next.rootReducer))
    })
  }

  return store
}