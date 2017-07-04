import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import AccountHeader from './AccountHeader'
import TransactionList from './TransactionList'

const Account = ({ match, data, classes }) => {
  const accountId = match.params.accountId
  const { account = { balance: {} } } = data
  const { balance, currency, spend_today: spentToday } = account.balance

  return (
    <section className={classes.container}>
      <AccountHeader
        className={classes.header}
        currency={currency}
        balance={balance}
        spentToday={spentToday}
      />
      <Paper className={classes.transactions}>
        <TransactionList
          accountId={accountId}
          since={moment().subtract(1, 'month').format()}
        />
      </Paper>
    </section>
  )
}

Account.propTypes = {
  match: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const AccountWithData = graphql(gql`
  query Account($accountId: String!) {
    account(accountId: $accountId) {
      id
      description
      balance {
        balance
        currency
        spend_today
      }
    }
  }
`, {
    options: ({ match }) => ({
      variables: {
        accountId: match.params.accountId
      }
    })
  })(Account)

const styleSheet = createStyleSheet('Account', (theme) => ({
  container: {
    width: 600,
    margin: 'auto',
    height: '100%',
    backgroundColor: '#fff'
  },

  header: {
    width: 600,
    position: 'fixed',
    boxSizing: 'border-box',
    zIndex: theme.zIndex.appBar
  },

  transactions: {
    paddingTop: 91,
    boxSizing: 'border-box',
    overflow: 'scroll',
    height: '100%'
  }
}))

export default withStyles(styleSheet)(AccountWithData)
