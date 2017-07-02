import { ApolloClient, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

networkInterface.useAfter([{
  applyAfterware({ res }, next) {
    // TODO: Add logout if token expires window.location.replace('/logout')
    debugger
    next()
  }
}])

export default new ApolloClient({ networkInterface })
