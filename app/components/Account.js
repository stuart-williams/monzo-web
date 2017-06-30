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
      <ul>
        {account.transactions.map(({ id, merchant, amount }) => (
          <li key={id}>{merchant ? merchant.name : 'Top up'} {amount}</li>
        ))}
      </ul>
    </section>
  )
}

Account.propTypes = {
  data: PropTypes.object.isRequired
}

export default graphql(gql`
  query($accountId: String!, $limit: Int, $since: String, $before: String) {
    account(accountId: $accountId) {
      id
      description
      type
      balance {
        balance
        currency
        spend_today
      }
      transactions(limit: $limit, since: $since, before: $before) {
        id
        amount
        merchant {
          name
        }
      }
    }
  }
`, {
    options: ({ match }) => ({
      variables: {
        accountId: match.params.accountId,
        since: '2017-06-01T23:00:00Z'
      }
    })
  })(Account)
