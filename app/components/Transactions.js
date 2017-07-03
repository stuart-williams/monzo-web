import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import formatAmount from '../utils/format-amount'
import Avatar from 'material-ui/Avatar'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AddCircle from 'material-ui-icons/AddCircle'
import { CircularProgress } from 'material-ui/Progress'
import categoryIcons from '../utils/category-icons'

const Transaction = (transaction) => {
  const { merchant, description, notes, amount, currency, category, metadata: meta } = transaction
  const displayAmount = formatAmount(currency, amount)
  const CategoryIcon = categoryIcons[category]

  if (merchant) {
    return (
      <ListItem>
        {merchant.logo
          ? <Avatar src={merchant.logo} />
          : <Avatar>{CategoryIcon ? <CategoryIcon /> : merchant.name[0]}</Avatar>}
        <ListItemText primary={merchant.name + ' ' + displayAmount} />
      </ListItem>
    )
  }

  if (meta && meta.is_topup === 'true') {
    return (
      <ListItem>
        <Avatar>
          <AddCircle />
        </Avatar>
        <ListItemText primary={description + ' +' + displayAmount} />
      </ListItem>
    )
  }

  return (
    <ListItem>
      <Avatar>{CategoryIcon ? <CategoryIcon /> : description[0]}</Avatar>
      <ListItemText
        primary={description + ' ' + displayAmount}
        secondary={notes}
      />
    </ListItem>
  )
}

const Transactions = ({ data, classes }) => {
  const { transactions } = data

  if (!transactions) {
    return (
      <div className={classes.progressCt}>
        <CircularProgress className={classes.progress} />
      </div>
    )
  }

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
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const TransactionsWithData = graphql(gql`
  query Account($accountId: String!, $since: String) {
    transactions(accountId: $accountId, since: $since) {
      id
      description
      notes
      amount
      currency
      category
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

const styleSheet = createStyleSheet('Transactions', (theme) => ({
  progressCt: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
}))

export default withStyles(styleSheet)(TransactionsWithData)
