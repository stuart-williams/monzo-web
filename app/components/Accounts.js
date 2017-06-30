import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

const Accounts = ({ data: { accounts = [] } }) => (
  <ul>
    {accounts.map(({ id, description, type }) => (
      <Link key={id} to={`/account/${id}`}>{description} {type}</Link>
    ))}
  </ul>
)

Accounts.propTypes = {
  data: PropTypes.object.isRequired
}

export default graphql(gql`
  query Accounts {
    accounts {
      id
      description
      type
    }
  }
`)(Accounts)
