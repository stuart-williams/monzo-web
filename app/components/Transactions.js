import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import formatAmount from '../utils/format-amount'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AddCircle from 'material-ui-icons/AddCircle'

const Transaction = (transaction) => {
  const { merchant, description, notes, amount, currency, metadata: meta } = transaction
  const displayAmount = formatAmount(currency, amount)

  if (merchant) {
    return (
      <ListItem>
        <Avatar src={merchant.logo} />
        <ListItemText primary={merchant.name + ' ' + displayAmount} />
      </ListItem>
    )
  }

  if (meta && meta.is_topup === 'true') {
    return (
      <ListItem>
        <Avatar style={{ backgroundColor: 'green' }}>
          <AddCircle />
        </Avatar>
        <ListItemText primary={description + ' +' + displayAmount} />
      </ListItem>
    )
  }

  return (
    <ListItem>
      <Avatar />
      <ListItemText
        primary={description + ' ' + displayAmount}
        secondary={notes}
      />
    </ListItem>
  )
}

const Transactions = ({ data }) => {
  const { transactions } = data

  if (!transactions) return <p>Loading...</p>

  return (
    <List>
      {[ ...transactions ].reverse().map((transaction, i) => (
        <div key={transaction.id}>
          {Transaction(transaction)}
          {transactions[i + 1] ? <Divider inset /> : null}
        </div>
      ))}
    </List>
  )
}

Transactions.propTypes = {
  data: PropTypes.object.isRequired
}

export default graphql(gql`
  query Account($accountId: String!, $since: String) {
    transactions(accountId: $accountId, since: $since) {
      id
      description
      notes
      amount
      currency
      metadata {
        is_topup
      }
      merchant {
        name
        logo
      }
    }
  }
`, {
    options: ({ accountId, since }) => ({
      variables: {
        accountId,
        since
      }
    })
  })(Transactions)
