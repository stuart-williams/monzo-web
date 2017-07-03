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
  const { account = { balance: {} } } = data
  const { balance = 0, currency, spend_today: spentToday = 0 } = account.balance

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography
              type='subheading'
              gutterBottom
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
              gutterBottom
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

const styleSheet = createStyleSheet('Account', (theme) => ({
  container: {
    width: 890,
    margin: 'auto',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.06), 0 2px 5px 0 rgba(0,0,0,0.2)'
  },

  header: {
    padding: 20,
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500])
  },

  headerSubheading: {
    color: 'inherit',
    opacity: 0.3
  },

  headerTitle: {
    color: 'inherit'
  }
}))

export default withStyles(styleSheet)(AccountWithData)
