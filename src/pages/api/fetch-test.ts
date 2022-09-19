import type { NextApiRequest, NextApiResponse } from 'next'
import FetchRankTags from '../../../db-commands/fetch-rank-tags'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // run fetch command
  FetchRankTags()

  res.status(200).json({ message: 'Ok' })
}

export default handler
