import fetch from 'isomorphic-fetch'
import { apiBaseUrl } from '../../config.json'

export default (path) => fetch(`${apiBaseUrl}${path}`, {
  headers: {
    'Authorization': `Bearer ${window.user.token}`
  }
})
  .then((res) => res.json())
  .then((data) => {
    if (data.error) throw new Error(data.message)
    return data
  })
