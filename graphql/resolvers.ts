import { TokenQuery } from '../src/queries'
import apolloClient from '../src/lib/apollo'

const UpdateTokenQuery = async () => {
  const { data } = await apolloClient.query({
    query: TokenQuery,
    context: { clientName: 'objkt-api' },
    variables: {
      pk: 0,
      gte: '2022-09-06T00:00:29+00:00',
      lt: '2022-09-06T00:10:00+00:00',
    },
  })

  console.log('token data', data)

  return data
}

const resolvers = {
  Query: {
    tokens: async () => UpdateTokenQuery(),

    updateTokenList: async () => {
      const data = await UpdateTokenQuery()
      console.log('data', data)
      return data.token[0].pk
    },
  },
}

export default resolvers
