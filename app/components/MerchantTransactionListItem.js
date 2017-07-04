import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import CategoryAvatar from './CategoryAvatar'

const MerchantTransactionListItem = ({ id, logo, name, category, amount, onClick }) => (
  <ListItem
    button
    onClick={() => onClick(id)}
  >
    {logo ? <Avatar src={logo} /> : <CategoryAvatar category={category} />}
    <ListItemText primary={name} />
    <Typography type='subheading'>
      {amount}
    </Typography>
  </ListItem>
)

MerchantTransactionListItem.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MerchantTransactionListItem
