import getSymbolFromCurrency from 'currency-symbol-map'

export default function formatAmount (currency, amount) {
  const currencySymbol = getSymbolFromCurrency(currency) || ''
  return `${currencySymbol}${(Math.abs(amount) / 100).toFixed(2)}`
}
