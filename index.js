'use strict';

const jsonQuery = require('json-query');
const JSONCache = require('json-fetch-cache');
const ComponentHandler = require('./lib/ComponentHandler.js');

const url = 'http://xenogelion.com/Hidden/Relics.json';

const maxCacheLength = process.env.LOCATION_MAX_CACHED_TIME || 60000;

/**
 * Describes a query against the location data at http://xenogelion.com/Hidden/Relics.json
 */
class LocationQuery {

  /**
   * Initialize Location query object, create the initial cache of data.
   */
  constructor() {
    this.cache = new JSONCache(url, maxCacheLength);
  }

  /**
   * Get the locations for a component based on the desired query.
   * @param {string} query Component query to search for the desired component with.
   * @returns {Promise<Array<string>>}
   */
  getLocationsForComponent(query) {
    return new Promise((resolve, reject) => {
      const defaultString = 'Operator, there is no such item location available.';
      this.cache.getDataJson()
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
        .catch(() => {
          resolve(defaultString);
        });
    });
  }

  /**
   * Get the locations for a component based on the desired query.
   * @param {string} query Component query to search for the desired component with.
   * @returns {Promise<Array<Item>>}
   */
  getAll(query) {
    return new Promise((resolve, reject) => {
      const defaultString = 'Operator, there is no such item location available.';
      this.cache.getDataJson()
        .then((dataCache) => {
          const results = jsonQuery(`components[*component~/${query}/i]`, {
            data: dataCache,
            allowRegexp: true,
          });
          if (typeof results.value === 'undefined' || results == null) {
            reject(new Error('No value for given query - LocationQuery#getLocationsForComponent'
                               , 'warframe-location-query/index.js', 67));
          }
          const componentHandler = new ComponentHandler(results.value);
          resolve(componentHandler.getAll());
        })
        .catch((err) => {
          resolve(defaultString);
          reject(err);
        });
    });
  }
}

module.exports = LocationQuery;
