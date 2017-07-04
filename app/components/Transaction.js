import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { gql, graphql } from 'react-apollo'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { calendarFormats } from '../../config.json'
import formatAmount from '../utils/format-amount'

const formatDate = (date) => moment(date).calendar(null, calendarFormats.dateTime)

const Transaction = ({ data: { transaction }, classes }) => {
  if (!transaction) return <p>Loading...</p>

  const { merchant, created, currency, amount } = transaction
  const displayAmount = formatAmount(currency, amount)

  return (
    <section className={classes.container}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs>
              <Avatar
                className={classes.avatar}
                src={merchant.logo}
              />
            </Grid>
            <Grid item xs>
              <Typography
                type='headline'
                align='right'
              >
                {displayAmount}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            type='title'
            gutterBottom
          >
            {merchant.name}
          </Typography>
          <Typography type='subheading'>
            {merchant.address.short_formatted}
          </Typography>
          <Typography type='body2'>
            {formatDate(created)}
          </Typography>
        </CardContent>
      </Card>
    </section>
  )
}

Transaction.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const TransactionWithData = graphql(gql`
  query Transaction($transactionId: String!) {
    transaction(transactionId: $transactionId) {
      id
      amount
      currency
      category
      created
      merchant {
        name
        logo
        address {
          short_formatted
        }
      }
    }
  }
`, {
    options: ({ match }) => ({
      variables: {
        transactionId: match.params.transactionId
      }
    })
  })(Transaction)

const styleSheet = createStyleSheet('Transaction', (theme) => ({
  container: {
    width: 600,
    margin: 'auto',
    backgroundColor: '#fff'
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 0,
    marginBottom: 20
  }
}))

export default withStyles(styleSheet)(TransactionWithData)
