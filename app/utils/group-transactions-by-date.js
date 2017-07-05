import moment from 'moment'

function getDate (date) {
  const d = moment(date)
  return +moment({ year: d.year(), month: d.month(), day: d.date() })
}

const sortDayTransactions = (a, b) => moment(b.created) - moment(a.created)

export default function groupTransactionsByDate (transactions) {
  return transactions.reduce((accum, transaction) => {
    const key = getDate(transaction.created)
    return Object.assign(accum, { [key]: [].concat(accum[key] || [], transaction).sort(sortDayTransactions) })
  }, {})
}
