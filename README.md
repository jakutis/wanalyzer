# wanalyzer

Workout analyzer

## Installation

1. install [Node.js](https://nodejs.org/)
2. run `npm install -g wanalyzer`

## Running

1. `wanalyzer csv2peakpace <filename>`
1. `wanalyzer tcx2hrzonetimes <filename> <maxhr>`

## Features

Calculates peak average pace (minutes per 1 kilometer) for windows ranging from 5 seconds to 60 minutes.
Each line of the input file must be a cumulative distance for each second of a workout.

You can get such data for example by using the CSV export of a workout in [Polar Flow](https://flow.polar.com/) webapp.
