import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import formatAmount from '../utils/format-amount'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Transactions from './Transactions'

const Account = ({ match, data, classes }) => {
  const accountId = match.params.accountId
  const { account } = data

  if (!account) return <p>Loading...</p>

  const { balance, currency, spend_today: spentToday } = account.balance

  return (
    <section className={classes.container}>
      <h1>{account.description}</h1>
      <p>Balance: {formatAmount(currency, balance)}</p>
      <p>Spent Today: {formatAmount(currency, spentToday)}</p>
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

const styleSheet = createStyleSheet('Account', {
  container: {
    width: '900px',
    margin: 'auto'
  }
})

export default withStyles(styleSheet)(AccountWithData)
