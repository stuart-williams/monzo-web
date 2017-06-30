const { buildSchema } = require('graphql')
const { addResolveFunctionsToSchema } = require('graphql-tools')
const fetch = require('../../common/api-fetch')

const resolverMap = {
  Account: {
    balance (parent, args, req) {
      return fetch(req.session.user, `balance?account_id=${parent.id}`)
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
    id: String!
    description: String
    type: String
    created: String
    balance: Balance
  }

  type Balance {
    balance: Int
    currency: String
    spend_today: Int
  }

  type Query {
    accounts: [Account]
    account(accountId: String!): Account
  }
`)

addResolveFunctionsToSchema(schema, resolverMap)

module.exports = schema
