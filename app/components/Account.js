import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

const Account = ({ data }) => {
  const { account } = data

  if (!account) return <p>Loading...</p>

  return (
    <section>
      <h1>{account.description}</h1>
      <p>Type: {account.type}</p>
      <p>Balance: {account.balance.balance}</p>
      <p>Spent Today: {account.balance.spend_today}</p>
    </section>
  )
}

Account.propTypes = {
  data: PropTypes.object.isRequired
}

export default graphql(gql`
  query($accountId: String!) {
    account(accountId: $accountId) {
      id
      description
      type
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
