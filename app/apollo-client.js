import { ApolloClient, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

networkInterface.useAfter([{
  applyAfterware ({ response }, next) {
    if (response.status === 401) {
      window.location.replace('/logout')
    } else {
      next()
    }
  }
}])

export default new ApolloClient({ networkInterface })
