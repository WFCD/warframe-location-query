'use strict';

const md = require('node-md-config');
const Item = require('./Item.js');
const RelicSort = require('./_utils.js').relicSort;

/**
 * Describes a PrimePart Item
 */
class PrimePart extends Item {
  /**
   * @param {Object} data JSON object containing data about this Prime Part
   */
  constructor(data) {
    super(data);
    this.component = data.component;
    this.ducats = typeof data.ducats !== 'undefined' ? data.ducats : '0';
    this.locations = data.location;
    this.type = 'Prime Part';
  }

  /**
   * Add a location to this PrimePart's list of locations
   * @param {string} locationToAdd 
   */
  addLocation(locationToAdd) {
    const self = this;
    let locationInLocations = false;
    self.locations.forEach((existingLocation) => {
      if ((locationToAdd.toLowerCase() === existingLocation.toLowerCase())) {
        locationInLocations = true;
      }
    });

    if (!locationInLocations) {
      self.locations.push(locationToAdd);
    }
  }
  
  /**
   * Add all locations from an array to the locations array
   * @param {Array<string>} locations locations to add 
   */
  addAll(locations) {
    for (const location of locations) {
      if (location) {
        this.addLocation(location);
      }
    }
  }

  /**
   * String representation of this PrimePart
   * @returns {string} string of this PrimePart
   */
  toString() {
    const extraSpace = '　　';
    return `${this.component} worth ${this.ducats}: ${md.lineEnd}${extraSpace}${this.locations.sort(RelicSort).join(`,${md.lineEnd}${extraSpace}`)}`;
  }
}

module.exports = PrimePart;
