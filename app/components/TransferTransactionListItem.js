import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import { ListItem, ListItemText } from 'material-ui/List'
import SwapHoriz from 'material-ui-icons/SwapHoriz'
import Typography from 'material-ui/Typography'
import { green } from 'material-ui/styles/colors'

const TransferTransaction = ({ id, description, amount, notes, originator, onClick, classes }) => (
  <ListItem
    button
    onClick={() => onClick(id)}
  >
    <Avatar>
      {description.startsWith('Transfer to ') ? <SwapHoriz /> : description[0]}
    </Avatar>
    <ListItemText
      primary={description}
      secondary={notes}
    />
    <Typography
      type='subheading'
      className={classNames({ [ classes.incomingAmount ]: !originator })}
    >
      {`${!originator ? '+' : ''}${amount}`}
    </Typography>
  </ListItem>
)

TransferTransaction.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  originator: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const styleSheet = createStyleSheet('TransferTransaction', (theme) => ({
  incomingAmount: {
    color: green[400]
  }
}))

export default withStyles(styleSheet)(TransferTransaction)
