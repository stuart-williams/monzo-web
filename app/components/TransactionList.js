import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import List, { ListSubheader } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { CircularProgress } from 'material-ui/Progress'
import MerchantTransactionListItem from './MerchantTransactionListItem'
import TopupTransactionListItem from './TopupTransactionListItem'
import TransferTransactionListItem from './TransferTransactionListItem'
import formatAmount from '../utils/format-amount'
import groupTransactionsByDate from '../utils/group-transactions-by-date'
import { calendarFormats } from '../../config.json'

const formatDate = (date) => moment(+date).calendar(null, calendarFormats.date)

const getTransaction = (transaction, onClick) => {
  const { id, merchant, description, notes, amount, currency, category, originator, metadata = {} } = transaction
  const displayAmount = formatAmount(currency, amount)

  if (merchant) {
    return (
      <MerchantTransactionListItem
        id={id}
        logo={merchant.logo}
        name={merchant.name}
        category={category}
        amount={displayAmount}
        onClick={onClick}
      />
    )
  }

  if (metadata.is_topup === 'true') {
    return (
      <TopupTransactionListItem
        id={id}
        description={description}
        amount={displayAmount}
        onClick={onClick}
      />
    )
  }

  return (
    <TransferTransactionListItem
      id={id}
      description={description}
      notes={notes}
      amount={displayAmount}
      originator={originator}
      onClick={onClick}
    />
  )
}

const TransactionList = ({ data: { transactions }, classes }, { router }) => {
  if (!transactions) {
    return (
      <div className={classes.progressCt}>
        <CircularProgress className={classes.progress} />
      </div>
    )
  }

  const grouped = groupTransactionsByDate(transactions)
  const sortedDates = Object.keys(grouped).sort((a, b) => b - a)
  const onClick = (transactionId) => router.history.push(`/transaction/${transactionId}`)

  return (
    <List>
      {sortedDates.map((date) => (
        <div key={date}>
          <ListSubheader>{formatDate(date)}</ListSubheader>
          {grouped[date].map((transaction, i) => (
            <div key={transaction.id}>
              {getTransaction(transaction, onClick)}
              {grouped[date][i + 1] && <Divider inset />}
            </div>
          ))}
        </div>
      ))}
    </List>
  )
}

TransactionList.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

TransactionList.contextTypes = {
  router: PropTypes.object.isRequired
}

const transactionsQuery = gql`
  query Transactions($accountId: String!, $since: String) {
    transactions(accountId: $accountId, since: $since) {
      id
      description
      notes
      amount
      currency
      category
      created
      originator
      metadata {
        is_topup
      }
      merchant {
        name
        logo
      }
    }
  }
`

const TransactionListWithData = graphql(transactionsQuery, {
  options: ({ accountId, since }) => ({
    variables: {
      accountId,
      since
    }
  })
})(TransactionList)

const styleSheet = createStyleSheet('TransactionList', (theme) => ({
  progressCt: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
}))

export default withStyles(styleSheet)(TransactionListWithData)
