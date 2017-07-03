import { ApolloClient, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const sessionExpired = (errors) => Array.isArray(errors) && errors.find(({ message }) => message === 'invalid_token')

// TODO: Can we not return a 401 response code??
networkInterface.useAfter([{
  applyAfterware ({ response }, next) {
    response.json()
      .then(({ errors }) => {
        if (sessionExpired(errors)) {
          window.location.replace('/logout')
        } else {
          next()
        }
      })
  }
}])

export default new ApolloClient({ networkInterface })
