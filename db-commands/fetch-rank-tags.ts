import RunTokenFetch from './fetch-tokens'

import addHoursToDateReturnString, {
  addHoursToStringReturnString,
} from '../app-utils/date-utils/addHours'

const roundToNearestHour = (date: Date) => {
  date.setMinutes(date.getMinutes() + 30)
  date.setMinutes(0, 0, 0)

  return date
}

const returnPrevHourDateAsString = (date: Date): string => {
  const dateNearestHour = roundToNearestHour(date)
  const datePrevHourString = addHoursToDateReturnString(-1, dateNearestHour)

  return datePrevHourString
}

const fetchAndRankTokens = async (
  start: string,
  end: string,
) => {
  // Fetch tokens
  console.log('RunTokenFetch Start')
  await RunTokenFetch(start, end)
  console.log('RunTokenFetch Completed')
}

const fetchAndRankPrevHour = async () => {

  const currentDate = new Date()
  const start = returnPrevHourDateAsString(currentDate)
  const end = addHoursToStringReturnString(1, start)

  console.log(`Fetch and Rank Prev Hour Start: ${start}, End: ${end}`)

  console.log(`START Fetch and Rank Tokens`)

  const startTime = performance.now()
  await fetchAndRankTokens(start, end)
  const endTime = performance.now()

  const duration = new Date(endTime - startTime)

  console.log(
    `Fetch and Rank Tokens took ${duration.getMinutes()} min ${duration.getSeconds()} sec`
  )
}

const FetchRankTags = async () => {
  fetchAndRankPrevHour()
}

export default FetchRankTags
