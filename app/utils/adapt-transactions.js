import * as colors from 'material-ui/styles/colors'

const usableColours = [
  colors.red,
  colors.pink,
  colors.purple,
  colors.blue,
  colors.green,
  colors.orange,
  colors.deepPurple,
  colors.indigo,
  colors.lightBlue,
  colors.cyan,
  colors.teal,
  colors.lightGreen,
  colors.lime,
  colors.amber,
  colors.deepOrange
]
let counterpartyMap = {}
let colorsIterator = new Set(usableColours).values()

const nextColor = () => {
  const color = colorsIterator.next().value
  if (color) return color
  colorsIterator = new Set(usableColours).values()
  return colorsIterator.next().value
}

const buildCounterpartyMap = (transactions) =>
  transactions.reduce((accum, { counterparty }) => {
    if (!(counterparty && counterparty.name && !accum[counterparty.user_id])) return accum

    return {
      ...accum,
      [counterparty.user_id]: {
        name: counterparty.name,
        color: nextColor()
      }
    }
  }, counterpartyMap)

export default function adaptTransactions (transactions) {
  counterpartyMap = buildCounterpartyMap(transactions)

  return transactions.map((transaction) => {
    const { counterparty = {} } = transaction
    const meta = counterpartyMap[counterparty.user_id]

    if (!meta) return transaction

    return {
      ...transaction,
      description: meta.name,
      color: meta.color
    }
  })
}
