'use strict';

const md = require('node-md-config');
const jsonQuery = require('json-query');
const Cache = require('json-fetch-cache');
const ComponentHandler = require('./src/ComponentHandler.js');

const url = 'http://xenogelion.com/Hidden/Relics.json';

const maxCacheLength = process.env.LOCATION_MAX_CACHED_TIME || 60000;

class LocationQuery {
  constructor() {
    this.cache = new Cache(url, maxCacheLength);
  }

  getLocationsForComponent(query) {
    return new Promise((resolve, reject) => {
      const defaultString = `${md.codeMulti}Operator, there is no such item location available.${md.blockEnd}`;
      this.cache.getData()
        .then((dataCache) => {
          const results = jsonQuery(`components[*component~/${query}/i]`, {
            data: dataCache,
            allowRegexp: true,
          });
          if (typeof results.value === 'undefined' || results == null) {
            reject(new Error('No value for given query - LocationQuery#getLocationsForComponent'
                               , 'warframe-location-query/index.js', 27));
          }
          const componentHandler = new ComponentHandler(results.value);
          resolve(componentHandler.toStringList());
        })
        .catch((err) => {
          resolve(defaultString);
          reject(err);
        });
    });
  }
}

module.exports = LocationQuery;
