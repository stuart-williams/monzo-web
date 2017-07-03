import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import formatAmount from '../utils/format-amount'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Transactions from './Transactions'

const Account = ({ match, data, classes }) => {
  const accountId = match.params.accountId
  const { account } = data

  if (!account) return <p>Loading...</p>

  const { balance, currency, spend_today: spentToday } = account.balance

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography
              type='subheading'
              className={classes.headerSubheading}
            >
              Balance
            </Typography>
            <Typography
              type='title'
              className={classes.headerTitle}
            >
              {formatAmount(currency, balance)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              type='subheading'
              className={classes.headerSubheading}
              align='right'
            >
              Spent Today
            </Typography>
            <Typography
              type='title'
              className={classes.headerTitle}
              align='right'
            >
              {formatAmount(currency, spentToday)}
            </Typography>
          </Grid>
        </Grid>
      </div>
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

// TODO: How am I going to organise colours/theming??
const styleSheet = createStyleSheet('Account', {
  container: {
    width: '890px',
    margin: 'auto',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.06), 0 2px 5px 0 rgba(0,0,0,0.2)'
  },

  header: {
    padding: '20px',
    backgroundColor: '#13233C'
  },

  headerSubheading: {
    color: 'rgba(255, 255, 255, 0.3)'
  },

  headerTitle: {
    color: 'white'
  }
})

export default withStyles(styleSheet)(AccountWithData)
