const querystring = require('querystring')
const { buildSchema } = require('graphql')
const { addResolveFunctionsToSchema } = require('graphql-tools')
const fetch = require('../../common/api-fetch')

const transactions = (user, { accountId, limit, since, before }) => {
  const query = querystring.stringify({
    account_id: accountId,
    'expand[]': 'merchant',
    limit,
    since,
    before
  })

  return fetch(user, `transactions?${query}`)
    .then(({ transactions }) => transactions)
}

const resolverMap = {
  Account: {
    balance: (parent, args, req) =>
      fetch(req.session.user, `balance?account_id=${parent.id}`),

    transactions: (parent, args, req) =>
      transactions(req.session.user, Object.assign({ accountId: parent.id }, args))
  },

  Query: {
    accounts: (parent, args, req) => {
      return fetch(req.session.user, 'accounts')
        .then(({ accounts }) => accounts)
    },

    account: (parent, { accountId }, req) => {
      return fetch(req.session.user, 'accounts')
        .then(({ accounts }) => accounts.find(({ id }) => id === accountId))
    },

    transactions: (parent, args, req) => transactions(req.session.user, args)
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
    currency: String
    description: String
    notes: String
    category: String
    merchant: Merchant
    metadata: TransactionMeta
  }

  type Merchant {
    id: String
    name: String
    logo: String
  }

  type TransactionMeta {
    is_topup: String
  }

  type Query {
    accounts: [Account]
    account(accountId: String!): Account
    transactions(accountId: String!, limit: Int, since: String, before: String): [Transaction]
  }
`)

addResolveFunctionsToSchema(schema, resolverMap)

module.exports = schema
