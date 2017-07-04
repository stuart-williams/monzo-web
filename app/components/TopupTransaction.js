import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import AddCircle from 'material-ui-icons/AddCircle'
import { green } from 'material-ui/styles/colors'

const TopupTransaction = ({ description, amount, classes }) => (
  <ListItem>
    <Avatar className={classes.avatar}>
      <AddCircle />
    </Avatar>
    <ListItemText primary={description} />
    <Typography
      type='subheading'
      className={classes.amount}
    >
      {`+${amount}`}
    </Typography>
  </ListItem>
)

TopupTransaction.propTypes = {
  description: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

const styleSheet = createStyleSheet('TopupTransaction', (theme) => ({
  avatar: {
    backgroundColor: green[400]
  },
  amount: {
    color: green[400]
  }
}))

export default withStyles(styleSheet)(TopupTransaction)
