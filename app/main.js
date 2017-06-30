import 'babel-polyfill'
import 'es6-promise/auto'

import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Switch, Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apollo-client'
import * as reducers from './reducers'
import Accounts from './components/Accounts'

const history = createHistory()
const middleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(middleware))
)

render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path='/' component={Accounts} />
          </Switch>
        </div>
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)
