import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import formatAmount from '../utils/format-amount'

const AccountHeader = ({ balance = 0, currency, spentToday = 0, className, classes }) => (
  <Paper
    elevation={2}
    className={classNames(className, classes.header)}
  >
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
  </Paper>
)

AccountHeader.propTypes = {
  balance: PropTypes.number,
  currency: PropTypes.string,
  spentToday: PropTypes.number,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
}

const styleSheet = createStyleSheet('AccountHeader', (theme) => ({
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

export default withStyles(styleSheet)(AccountHeader)
