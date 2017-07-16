import 'rxjs/add/operator/map'
import 'rxjs/add/operator/pairwise'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/exhaustMap'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { fromPromise } from 'rxjs/observable/fromPromise'

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, { ListSubheader } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import MerchantTransactionListItem from './MerchantTransactionListItem'
import TopupTransactionListItem from './TopupTransactionListItem'
import TransferTransactionListItem from './TransferTransactionListItem'
import formatAmount from '../utils/format-amount'
import groupTransactionsByDate from '../utils/group-transactions-by-date'
import adaptTransactions from '../utils/adapt-transactions'
import { calendarFormats } from '../../config.json'

const formatDate = (date) => moment(+date).calendar(null, calendarFormats.date)
const subtractSomeTime = (d) => moment(d).subtract(1, 'month').format()

const isUserScrollingDown = (positions) => positions[0].sT < positions[1].sT
const isScrollExpectedPercent = (position, percent) => ((position.sT + position.cH) / position.sH) > (percent / 100)

const transactionComponent = (transaction, onClick) => {
  const { merchant, amount, currency, metadata = {} } = transaction
  const displayAmount = formatAmount(currency, amount)

  if (merchant) {
    return (
      <MerchantTransactionListItem
        {...transaction}
        amount={displayAmount}
        onClick={onClick}
      />
    )
  }

  if (metadata.is_topup === 'true') {
    return (
      <TopupTransactionListItem
        {...transaction}
        amount={displayAmount}
        onClick={onClick}
      />
    )
  }

  return (
    <TransferTransactionListItem
      {...transaction}
      amount={displayAmount}
      onClick={onClick}
    />
  )
}

class TransactionList extends Component {
  constructor (props) {
    super(props)
    this.pagination = { since: subtractSomeTime() }
  }

  nextPagination () {
    const { since } = this.pagination
    this.pagination = { before: since, since: subtractSomeTime(since) }
    return this.pagination
  }

  componentDidMount () {
    const { loadMore } = this.props

    this.paginationSubscription = fromEvent(this.scroller, 'scroll')
      .map((e) => ({
        sH: e.target.scrollHeight,
        sT: e.target.scrollTop,
        cH: e.target.clientHeight
      }))
      .pairwise()
      .filter((positions) => isUserScrollingDown(positions) && isScrollExpectedPercent(positions[1], 70))
      .exhaustMap(() => fromPromise(loadMore(this.nextPagination())))
      .subscribe()
  }

  componentWillUnmount () {
    this.paginationSubscription.unsubscribe()
  }

  render () {
    const { transactions, classes } = this.props
    const { router } = this.context
    const grouped = groupTransactionsByDate(transactions)
    const sortedDates = Object.keys(grouped).sort((a, b) => b - a)
    const onClick = (transactionId) => router.history.push(`/transaction/${transactionId}`)

    return (
      <Paper
        className={classes.scroller}
        ref={(node) => { this.scroller = findDOMNode(node) }}
      >
        <List>
          {sortedDates.map((date) => (
            <div key={date}>
              <ListSubheader>{formatDate(date)}</ListSubheader>
              {grouped[date].map((transaction, i) => (
                <div key={transaction.id}>
                  {transactionComponent(transaction, onClick)}
                  {grouped[date][i + 1] && <Divider inset />}
                </div>
              ))}
            </div>
          ))}
        </List>
      </Paper>
    )
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  loadMore: PropTypes.func.isRequired
}

TransactionList.contextTypes = {
  router: PropTypes.object.isRequired
}

const transactionsQuery = gql`
  query Transactions($accountId: String!, $before: String, $since: String) {
    transactions(accountId: $accountId, before: $before, since: $since) {
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
      counterparty {
        user_id
        name
      }
      merchant {
        name
        logo
      }
    }
  }
`

const TransactionListWithData = graphql(transactionsQuery, {
  options: ({ accountId }) => ({
    variables: {
      accountId,
      since: subtractSomeTime()
    }
  }),
  props: ({ data: { transactions = [], fetchMore } }) => ({
    transactions: adaptTransactions(transactions),
    loadMore (variables) {
      return fetchMore({
        variables,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return { transactions: [ ...prev.transactions, ...fetchMoreResult.transactions ] }
        }
      })
    }
  })
})(TransactionList)

const styleSheet = createStyleSheet('TransactionList', (theme) => ({
  scroller: {
    paddingTop: 91,
    boxSizing: 'border-box',
    overflow: 'scroll',
    height: '100%'
  }
}))

export default withStyles(styleSheet)(TransactionListWithData)
