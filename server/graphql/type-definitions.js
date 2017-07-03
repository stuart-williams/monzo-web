module.exports = `
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
    created: String
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
`
