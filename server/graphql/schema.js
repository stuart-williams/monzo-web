const { buildSchema } = require('graphql')
const { addResolveFunctionsToSchema } = require('graphql-tools')
const fetch = require('../../common/api-fetch')

const resolverMap = {
  Account: {
    balance (parent, args, req) {
      return fetch(req.session.user, `balance?account_id=${parent.id}`)
    },

    // TODO: Get limit, since and before from args and construct query
    transactions (parent, args, req) {
      return fetch(req.session.user, `transactions?account_id=${parent.id}&expand[]=merchant&since=2017-06-01T23:00:00Z`)
        .then(({ transactions }) => transactions)
    }
  },

  Query: {
    accounts: (parent, args, req) => {
      return fetch(req.session.user, 'accounts')
        .then(({ accounts }) => accounts)
    },

    account: (parent, { accountId }, req) => {
      return fetch(req.session.user, 'accounts')
        .then(({ accounts }) => accounts.find(({ id }) => id === accountId))
    }
  }
}

const schema = buildSchema(`
  type Account {
    id: String
    description: String
    type: String
    created: String
    balance: Balance
    transactions(limit: Int, since: String, before: String): [Transaction]
  }

  type Balance {
    balance: Int
    currency: String
    spend_today: Int
  }

  type Transaction {
    id: String
    amount: Int
    merchant: Merchant
  }

  type Merchant {
    id: String
    name: String
  }

  type Query {
    accounts: [Account]
    account(accountId: String!): Account
  }
`)

addResolveFunctionsToSchema(schema, resolverMap)

module.exports = schema
