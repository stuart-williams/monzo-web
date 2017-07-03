import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import formatAmount from '../utils/format-amount'

const AccountHeader = ({ balance = 0, currency, spentToday = 0, classes }) => (
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
)

AccountHeader.propTypes = {
  balance: PropTypes.number,
  currency: PropTypes.string,
  spentToday: PropTypes.number,
  classes: PropTypes.object.isRequired
}

const styleSheet = createStyleSheet('AccountHeader', (theme) => ({
  header: {
    padding: 20,
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
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
