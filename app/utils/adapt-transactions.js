export default function adaptTransactions (transactions) {
  const map = transactions.reduce((m, { counterparty: c }) =>
    c && c.name ? { ...m, [c.user_id]: c.name } : m, {})
  return transactions.map((t) =>
    t.counterparty && map[t.counterparty.user_id] ? { ...t, description: map[t.counterparty.user_id] } : t)
}
