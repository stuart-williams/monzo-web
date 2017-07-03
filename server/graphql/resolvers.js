const querystring = require('querystring')
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

module.exports = {
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
