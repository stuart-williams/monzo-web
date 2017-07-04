import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import CategoryAvatar from './CategoryAvatar'

const MerchantTransaction = ({ logo, name, category, amount }) => (
  <ListItem>
    {logo ? <Avatar src={logo} /> : <CategoryAvatar category={category} />}
    <ListItemText primary={name} />
    <Typography type='subheading'>
      {amount}
    </Typography>
  </ListItem>
)

MerchantTransaction.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
}

export default MerchantTransaction
