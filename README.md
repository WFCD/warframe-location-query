# warframe-location-query

A node project for fetching data from `http://xenogelion.com/Hidden/Relics.json` to give data about relic and prime part drops.

## Installation
```
npm install --save warframe-location-query
```

## Usage

Require | Module File | Accessor | Description | parameters
--- | --- | --- | --- | ---
`warframe-location-query` | `index.js` | `.getLocationsForComponent` | Get Query result string for a location lookup query | `query`, `callback`

## Environment variables

Variable | example | default
--- | --- | ---
`LOCATION_MAX_CACHED_TIME` | `600000` | `30000`

## Objects

Relic

* `name` - Components fetched
* `type` - Type of the item - relic
* `locations` - List of locations where this relic can be found

Prime Part

* `name` - Components fetched
* `type` - Type of the item - Prime part
* `locations` - List of relics in which this prime part can be found
* `ducats` - Value of priime part in ducats