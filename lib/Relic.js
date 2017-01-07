'use strict';

const md = require('node-md-config');
const toTitleCase = require('./_utils.js').toTitleCase;
const locationsFromJson = require('./_utils.js').locationsFromJson;
const Item = require('./Item.js');

const extraSpace = '　　';

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
     * List of relic locations, if the relic is vaulted,
     *  it's a singleton list with just 'Prime Vault' included
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
    return `${this.name}: ${md.lineEnd}${extraSpace}${this.location}`;
  }
}

module.exports = Relic;
