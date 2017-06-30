const { buildSchema } = require('graphql')
const { addResolveFunctionsToSchema } = require('graphql-tools')
const fetch = require('../../common/api-fetch')

const resolverMap = {
  Account: {
    balance (parent, args, context) {
      return fetch(context.session.user, `balance?account_id=${parent.id}`)
    }
  },

  Query: {
    accounts: (parent, args, context) => {
      return fetch(context.session.user, 'accounts')
        .then(({ accounts }) => accounts)
    }
  }
}

const schema = buildSchema(`
  type Account {
    id: String!
    description: String
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
  }
`)

addResolveFunctionsToSchema(schema, resolverMap)

module.exports = schema
