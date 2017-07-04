import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import EatingOut from 'material-ui-icons/Restaurant'
import Transport from 'material-ui-icons/DirectionsCar'
import Groceries from 'material-ui-icons/LocalGroceryStore'
import Cash from 'material-ui-icons/AttachMoney'
import Bills from 'material-ui-icons/LightbulbOutline'
import Entertainment from 'material-ui-icons/SentimentVerySatisfied'
import Shopping from 'material-ui-icons/ShoppingBasket'
import Holidays from 'material-ui-icons/FlightTakeoff'
import Expenses from 'material-ui-icons/AccountBalanceWallet'
import General from 'material-ui-icons/Public'
import { red, amber, orange, blueGrey, teal, cyan, pink, purple, lime } from 'material-ui/styles/colors'

export const categoryMap = {
  eating_out: EatingOut,
  transport: Transport,
  groceries: Groceries,
  cash: Cash,
  bills: Bills,
  entertainment: Entertainment,
  shopping: Shopping,
  holidays: Holidays,
  expenses: Expenses,
  general: General
}

const CategoryAvatar = ({ category, classes }) => {
  const Icon = categoryMap[category] || General

  return (
    <Avatar className={classes[category]}>
      <Icon />
    </Avatar>
  )
}

CategoryAvatar.propTypes = {
  category: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

const styleSheet = createStyleSheet('CategoryAvatar', (theme) => ({
  eating_out: {
    backgroundColor: red[300]
  },
  transport: {
    backgroundColor: blueGrey[300]
  },
  groceries: {
    backgroundColor: amber[300]
  },
  cash: {
    backgroundColor: teal[300]
  },
  bills: {
    backgroundColor: cyan[300]
  },
  entertainment: {
    backgroundColor: orange[300]
  },
  shopping: {
    backgroundColor: pink[300]
  },
  holidays: {
    backgroundColor: purple[300]
  },
  expenses: {
    backgroundColor: lime[300]
  }
}))

export default withStyles(styleSheet)(CategoryAvatar)
