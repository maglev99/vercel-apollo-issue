// added for runnning fetch operation without using graphql
import fetch from 'cross-fetch'

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

import z from 'zod'
import { TokenQuery } from '../src/queries'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://data.objkt.com/v2/graphql', fetch }),
})

const UpdateTokenQuery = async (
  pk: number,
  timestamp_gte: string,
  timestamp_lt: string
) => {
  const { data, error } = await apolloClient.query({
    query: TokenQuery,
    context: { clientName: 'objkt-api' },
    variables: { pk, gte: timestamp_gte, lt: timestamp_lt },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  })

  if (error)
  {
    console.log('Apollo client error', error)
  }

  return data
}

const boolObjectValidator = z.object({
  value: z.boolean(),
})

type BoolObject = z.infer<typeof boolObjectValidator>

const indexObjectValidator = z.object({
  value: z.bigint(),
})

type IndexObject = z.infer<typeof indexObjectValidator>

const fetchTokens = async (
  pkIndex: IndexObject,
  pkList: bigint[],
  fetchComplete: BoolObject,
  start: string,
  end: string
) => {
  while (!fetchComplete.value) {

  console.log('entered fetchTokens Loop')

    const timestampGte = start
    const timestampLt = end

    // eslint-disable-next-line no-await-in-loop
    const data = await UpdateTokenQuery(
      Number(pkIndex.value),
      timestampGte,
      timestampLt
    )

    console.log('token data', data)

    const tokenCount = data.token.length
    // console.log('token count', tokenCount)

    if (tokenCount < 1) {
      console.log('all tokens in query range fetched')
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
      fetchComplete.value = true
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const token of data.token) {
      pkList.push(token.pk)
    }

    const pkListLength = pkList.length

    if (pkListLength > 0) {
      // type guard for pkIndex for if it is null
      const bigindex: bigint = pkList[pkListLength - 1] || BigInt(0)
      // eslint-disable-next-line no-param-reassign
      pkIndex.value = bigindex
    }
  }
}

const RunTokenFetch = async (start: string, end: string) => {
  // index for tracking last token of each fetch so will fetch next batch if there are more tokens beyond the initial query return
  // eslint-disable-next-line prefer-const
  let pkIndex: IndexObject = { value: BigInt(0) }
  const pkList: bigint[] = []

  // eslint-disable-next-line prefer-const
  let fetchComplete: BoolObject = { value: false }

  try {
    await fetchTokens(pkIndex, pkList, fetchComplete, start, end)

    console.log('tokens fetched')
    console.log('token pk list', pkList)

    const pkListLength = pkList.length
    if (pkListLength > 0) {
      console.log('last token pk in list', pkList[pkListLength - 1])
    }
  } catch (error) {
    console.log('error', error)
  }
}

export default RunTokenFetch
