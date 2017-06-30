import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { connect } from 'react-redux'

const initialAccount = { balance: {}, spend_today: 0 }

const Account = ({ accountId, data: { account = initialAccount } }) => (
  <section>
    <h1>{account.description}</h1>
    <p>Type: {account.type}</p>
    <p>Balance: {account.balance.balance}</p>
    <p>Spent Today: {account.balance.spend_today}</p>
  </section>
)

Account.propTypes = {
  accountId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

const AccountWithData = graphql(gql`
  query($accountId: String!) {
    account(accountId: $accountId) {
      id
      description
      type
      balance {
        balance
        currency
        spend_today
      }
    }
  }
`, {
    options: ({ accountId }) => ({
      variables: {
        accountId
      }
    })
  })(Account)

const mapStateToProps = (state, { match }) => ({
  accountId: match.params.accountId
})

export default connect(mapStateToProps)(AccountWithData)
