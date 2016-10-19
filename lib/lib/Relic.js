'use strict';

const md = require('node-md-config');
const toTitleCase = require('./_utils.js').toTitleCase;
const Item = require('./Item.js');

/**
 * Pad the location string to be a uniform width under monospace situations
 * @param {string} locationString the base location string to pad
 * @returns {string} the padded location string
 */
function padLocation(locationString) {
  let str;
  if (locationString.length < 8) {
    str = padLocation(`${locationString} `);
  } else {
    str = locationString;
  }
  return str;
}

/**
 * Create locations for the relic from a given json
 * @param {Object} locations
 * @returns {Array<string>} Array of location strings
 */
function locationsFromJson(locations) {
  const locListReturn = [];
  for (const loc of locations) {
    const location = `${padLocation(loc)} | `;
    const locAray = loc;
    const tokens = [];
    for (const subLoc of locAray) {
      if (subLoc[1] === '') {
        tokens.push(subLoc[0]);
      } else {
        tokens.push(`${subLoc[0]} (${subLoc[1].toLowerCase()})`);
      }
    }
    locListReturn.push(location + tokens.join(', '));
  }
  return locListReturn;
}

/**
 * Describes a Relic Item
 */
class Relic extends Item {
  /**
   * @param {Object} data JSON object containing data about this Relic
   */
  constructor(data) {
    super();
    const relicIsVaulted = data.locations === '';
    /**
     * The component string information, including whether or not it's vaulted
     * @type {string}
     */
    this.component = `${toTitleCase(data.component)}${(relicIsVaulted ? ' - Vaulted' : '')}`;
    
    /**
     * List of relic locations, if the relic is vaulted, it's a singleton list with just 'Prime Vault' included
     * @type {Array<string>}
     */
    this.locations = relicIsVaulted ? ['Prime Vault'] : locationsFromJson(data.locations);
    
    /**
     * Type of the Item, will always be relic for Relic objects
     * @type {string}
     */
    this.type = 'Relic';
  }
  
  /**
   * Get the location string
   * @returns {string}
   */
  get location() {
    return this.locations.join(`,${md.lineEnd}${extraSpace}`);
  }

  /**
   * String representation of Relic
   * @returns {string}
   */
  toString() {
    const extraSpace = '　　';
    return `${this.name}: ${md.lineEnd}${extraSpace}${location}`;
  }
}

module.exports = Relic;
