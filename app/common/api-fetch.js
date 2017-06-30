import fetch from 'isomorphic-fetch'
import { apiBaseUrl } from '../../config.json'

export default (path) => fetch(`${apiBaseUrl}${path}`, {
  headers: {
    'Authorization': `Bearer ${window.user.token}`
  }
})
  .then((res) => res.json())
  .then((data) => {
    // Session has expired so ask the user to sign in again
    if (data.invalid_token) return window.location.replace('/logout')
    if (data.error) throw new Error(data.message)
    return data
  })
