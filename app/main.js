import 'typeface-roboto'
import 'babel-polyfill'
import 'es6-promise/auto'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apollo-client'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from './styles/monzo-theme'

// Route Components
import Accounts from './components/Accounts'
import Account from './components/Account'
import Transaction from './components/Transaction'

render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <div>
          <Route exact path='/' component={Accounts} />
          <Route path='/account/:accountId' component={Account} />
          <Route path='/transaction/:transactionId' component={Transaction} />
        </div>
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
