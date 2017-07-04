import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

class AccountList extends Component {
  shouldComponentUpdate ({ data: { accounts = [] }, history }) {
    if (accounts.length === 1) {
      history.replace(`/account/${accounts[0].id}`)
      return false
    }
    return true
  }

  render () {
    const { accounts } = this.props.data

    if (!accounts) return <p>Loading...</p>

    return (
      <ul>
        {accounts.map(({ id, description, type }) => (
          <Link key={id} to={`/account/${id}`}>{description} {type}</Link>
        ))}
      </ul>
    )
  }
}

AccountList.propTypes = {
  data: PropTypes.object.isRequired
}

export default graphql(gql`
  query AccountList {
    accounts {
      id
      description
      type
    }
  }
`)(AccountList)
