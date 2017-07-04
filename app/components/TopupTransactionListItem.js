import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import AddCircle from 'material-ui-icons/AddCircle'
import { green } from 'material-ui/styles/colors'

const TopupTransactionListItem = ({ id, description, amount, classes, onClick }) => (
  <ListItem
    button
    onClick={() => onClick(id)}
  >
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

TopupTransactionListItem.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

const styleSheet = createStyleSheet('TopupTransactionListItem', (theme) => ({
  avatar: {
    backgroundColor: green[400]
  },
  amount: {
    color: green[400]
  }
}))

export default withStyles(styleSheet)(TopupTransactionListItem)
