import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { ListItem, ListItemText } from 'material-ui/List'
import SwapHoriz from 'material-ui-icons/SwapHoriz'
import Typography from 'material-ui/Typography'

const TransferTransaction = ({ description, amount, notes }) => (
  <ListItem>
    <Avatar>
      {description.startsWith('Transfer to ') ? <SwapHoriz /> : description[0]}
    </Avatar>
    <ListItemText
      primary={description}
      secondary={notes}
    />
    <Typography type='subheading'>
      {amount}
    </Typography>
  </ListItem>
)

TransferTransaction.propTypes = {
  description: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired
}

export default TransferTransaction
