import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import categoryIcons from '../utils/category-icons'

function avatar (logo, name, category) {
  if (logo) return <Avatar src={logo} />
  const CategoryIcon = categoryIcons[category]
  if (CategoryIcon) return <Avatar><CategoryIcon /></Avatar>
  return <Avatar>{name[0]}</Avatar>
}

const MerchantTransaction = ({ logo, name, category, amount }) => (
  <ListItem>
    {avatar(logo, name, category)}
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
