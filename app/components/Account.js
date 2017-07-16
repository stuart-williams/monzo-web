import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import AccountHeader from './AccountHeader'
import TransactionList from './TransactionList'

const Account = ({ account, accountId, classes }) => {
  const { balance, currency, spend_today: spentToday } = account.balance

  return (
    <section className={classes.container}>
      <AccountHeader
        className={classes.header}
        currency={currency}
        balance={balance}
        spentToday={spentToday}
      />
      <TransactionList accountId={accountId} />
    </section>
  )
}

Account.propTypes = {
  accountId: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const accountQuery = gql`
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
`

const AccountWithData = graphql(accountQuery, {
  options: ({ match }) => ({
    variables: {
      accountId: match.params.accountId
    }
  }),
  props: ({ data: { account = { balance: {} } }, ownProps: { match } }) => ({
    accountId: match.params.accountId,
    account
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
  }
}))

export default withStyles(styleSheet)(AccountWithData)
