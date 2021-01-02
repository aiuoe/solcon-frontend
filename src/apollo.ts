import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import EchoLink from '@/echo'

// HTTP connection to the API
const httpLink = setContext(() => ({headers: {authorization: `Bearer ${window.localStorage.getItem('token')}`}})).concat(createHttpLink({uri: `${process.env.VUE_APP_API_URL}/graphql`}))

const cache = new InMemoryCache()
const echoLink = new EchoLink();

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([echoLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' }
  },
  connectToDevTools: true
})