import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import AccountHeader from './AccountHeader'
import Transactions from './Transactions'

const Account = ({ match, data, classes }) => {
  const accountId = match.params.accountId
  const { account = { balance: {} } } = data
  const { balance, currency, spend_today: spentToday } = account.balance

  return (
    <section className={classes.container}>
      <AccountHeader
        currency={currency}
        balance={balance}
        spentToday={spentToday}
      />
      <Transactions
        accountId={accountId}
        since={moment().subtract(1, 'month').format()}
      />
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
    margin: '10px auto',
    backgroundColor: '#fff',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.06), 0 2px 5px 0 rgba(0,0,0,0.2)'
  }
}))

export default withStyles(styleSheet)(AccountWithData)
