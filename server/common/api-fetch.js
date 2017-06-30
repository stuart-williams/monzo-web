const fetch = require('isomorphic-fetch')
const { apiBaseUrl } = require('../../config.json')

module.exports = (user, path) => fetch(`${apiBaseUrl}${path}`, {
  headers: {
    'Authorization': `Bearer ${user.token}`
  }
})
  .then((res) => res.json())
  .then((data) => {
    if (data.error) throw new Error(data.message)
    return data
  })
