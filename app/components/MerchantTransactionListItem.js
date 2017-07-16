import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import CategoryAvatar from './CategoryAvatar'

const MerchantTransactionListItem = ({ id, merchant, category, amount }) => (
  <ListItem>
    {merchant.logo
      ? <Avatar src={merchant.logo} />
      : <CategoryAvatar category={category} />}
    <ListItemText primary={merchant.name} />
    <Typography type='subheading'>
      {amount}
    </Typography>
  </ListItem>
)

MerchantTransactionListItem.propTypes = {
  id: PropTypes.string.isRequired,
  merchant: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
}

export default MerchantTransactionListItem
