import { readFileSync,writeFileSync } from 'fs'
import { parseString } from 'xml2js'

export const tcx2hrzonetimes = (tcx, maxhr) => {
  maxhr = Number(maxhr)
  parseString(readFileSync(tcx).toString(), (err, json) => {
    writeFileSync('a.json', JSON.stringify(json, null, 2))
    json.TrainingCenterDatabase.Activities[0].Activity[0].Lap.forEach((lap, lapI) => {
      console.log()
      console.log('Lap #' + (lapI + 1))
      console.log()

      const points = lap.Track[0].Trackpoint
      let previousTime
      let previousHr
      const durations = [0, 0, 0, 0, 0]
      const getZone = hr => {
        if (hr/maxhr <= 0.6) {
          return 0
        }
        if (hr/maxhr <= 0.7) {
          return 1
        }
        if (hr/maxhr <= 0.8) {
          return 2
        }
        if (hr/maxhr <= 0.9) {
          return 3
        }
        if (hr/maxhr <= 1) {
          return 4
        }
      }
      points.forEach((point, i) => {
        const time = Date.parse(point.Time[0])
        const hr = point.HeartRateBpm[0].Value[0]
        if (i > 0) {
          durations[getZone(previousHr)] += time - previousTime
        }
        previousTime = time
        previousHr = hr
      })

      let total = 0
      durations.forEach((duration, i) => {
        total += duration

        console.log('Zone ' + (i + 1) + ':')
        const from = (i + 5) / 10
        const to = (i + 6) / 10
        console.log('range: ' + (from * 100) + '% - ' + (to * 100) + '%')
        console.log('range: ' + Math.round(from * maxhr) + 'bpm - ' + Math.round(to * maxhr) + 'bpm')
        console.log('time: ' + duration + 'ms')
      })

      const totalTime = Number(lap.TotalTimeSeconds[0]) * 1000
      total = total
      console.log('Difference between TotalTimeSeconds and summed Trackpoints: ' + (totalTime - total) + 'ms')
    })
  })
}
