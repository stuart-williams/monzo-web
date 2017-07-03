import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import formatAmount from '../utils/format-amount'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { CircularProgress } from 'material-ui/Progress'
import MerchantTransaction from './MerchantTransaction'
import TopupTransaction from './TopupTransaction'
import TransferTransaction from './TransferTransaction'

const Transaction = (transaction) => {
  const { merchant, description, notes, amount, currency, category, metadata: meta = {} } = transaction
  const displayAmount = formatAmount(currency, amount)

  if (merchant) {
    return (
      <MerchantTransaction
        logo={merchant.logo}
        name={merchant.name}
        category={category}
        amount={displayAmount}
      />
    )
  }

  if (meta.is_topup === 'true') {
    return (
      <TopupTransaction
        description={description}
        amount={displayAmount}
      />
    )
  }

  return (
    <TransferTransaction
      description={description}
      notes={notes}
      amount={displayAmount}
    />
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
