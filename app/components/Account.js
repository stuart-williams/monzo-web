import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import moment from 'moment'

import List, { ListItem, ListItemText } from 'material-ui/List'

const Account = ({ data }) => {
  const { account } = data

  if (!account) return <p>Loading...</p>

  return (
    <section>
      <h1>{account.description}</h1>
      <p>Type: {account.type}</p>
      <p>Balance: {account.balance.balance}</p>
      <p>Spent Today: {account.balance.spend_today}</p>
      <List>
        {account.transactions.map(({ id, merchant, amount }) => (
          <ListItem key={id}>
            <ListItemText primary={`${merchant ? merchant.name : 'Top up'} ${amount}`} />
          </ListItem>
        ))}
      </List>
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
        since: moment().subtract(1, 'month').format()
      }
    })
  })(Account)
