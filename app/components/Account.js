import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Account = ({ accountId }) => {
  return <h1>Account {accountId}</h1>
}

Account.propTypes = {
  accountId: PropTypes.string.isRequired
}

const mapStateToProps = (state, { match }) => ({
  accountId: match.params.accountId
})

export default connect(mapStateToProps)(Account)
