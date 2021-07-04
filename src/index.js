import { readFileSync } from 'fs'

const file = process.argv[2]
if (file === undefined) {
  throw new Error('Missing path to file')
}
const parseDuration = pace => {
  const [ minutes, seconds ] = pace.split(':')
  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10)
}
const stringifyDuration = pace => {
  const minutes = String(Math.floor(pace / 60))
  const seconds = String(pace - (minutes * 60))
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}
const stringifyDurationForHumans = pace => {
  const minutes = Math.floor(pace / 60)
  const seconds = pace - (minutes * 60)
  const secondsString = `${seconds} second${seconds === 1 ? '' : 's'}`

  if (minutes === 0) {
    return secondsString
  }

  const minutesString = `${minutes} minute${minutes === 1 ? '' : 's'}`
  if (seconds > 0) {
    return minutesString + ` and ${secondsString}`
  } else {
    return minutesString
  }
}
const averagePaceFromDistance = (distance, from, window) => Math.round(window / ((distance[from + window] - distance[from]) / 1000))
const distance = readFileSync(file).toString().trim().split(/\s+/).map(Number)
const maxAverageFromDistance = (distance, window) => {
  let max = Number.POSITIVE_INFINITY
  for (let i = 0; (i + window) < distance.length; i++) {
    const current = averagePaceFromDistance(distance, i, window)
    if (current < max) {
      max = current
    }
  }
  return max
}

console.log('Peak pace')
console.log('');

[
  '00:05',
  '00:10',
  '00:12',
  '00:20',
  '00:30',
  '01:00',
  '02:00',
  '05:00',
  '06:00',
  '10:00',
  '12:00',
  '20:00',
  '30:00',
  '45:00',
  '60:00',
].forEach(window => {
  const pace = maxAverageFromDistance(distance, parseDuration(window))
  if (!Number.isFinite(pace)) {
    return
  }
  console.log(stringifyDurationForHumans(parseDuration(window)).padStart(10), stringifyDuration(pace))
})
