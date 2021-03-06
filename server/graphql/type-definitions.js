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
    originator: Boolean
    metadata: TransactionMeta
    counterparty: TransactionCounterparty
  }

  type Merchant {
    id: String
    name: String
    logo: String
    address: MerchantAddress
  }

  type MerchantAddress {
    short_formatted: String
    latitude: Float
    longitude: Float
  }

  type TransactionMeta {
    is_topup: String
  }

  type TransactionCounterparty {
    user_id: String
    name: String
    prefered_name: String
  }

  type Query {
    accounts: [Account]
    account(accountId: String!): Account
    transactions(accountId: String!, limit: Int, since: String, before: String): [Transaction]
    transaction(transactionId: String!): Transaction
  }
`
