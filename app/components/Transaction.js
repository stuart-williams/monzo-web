import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

const Transaction = ({ data: { transaction } }) => {
  console.log(transaction)

  return (
    <h1>Transaction</h1>
  )
}

Transaction.propTypes = {
  data: PropTypes.object.isRequired
}

const TransactionWithData = graphql(gql`
  query Transaction($transactionId: String!) {
    transaction(transactionId: $transactionId) {
      id
      description
      notes
      amount
      currency
      category
      created
      metadata {
        is_topup
      }
      merchant {
        name
        logo
      }
    }
  }
`, {
    options: ({ match }) => ({
      variables: {
        transactionId: match.params.transactionId
      }
    })
  })(Transaction)

export default TransactionWithData
