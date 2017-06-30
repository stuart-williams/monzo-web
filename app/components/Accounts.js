import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

const Accounts = ({ data: { accounts = [] } }) => (
  <ul>
    {accounts.map(({ id, description, type, balance }) => (
      <div key={id}>
        {`${description} ${type} ${balance.currency}${balance.balance}`}
      </div>
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
      type,
      balance {
        balance
        currency
      }
    }
  }
`)(Accounts)
