'use strict';

const md = require('node-md-config');
const Item = require('./Item.js');
const RelicSort = require('./_utils.js').relicSort;

class PrimePart extends Item {
  constructor(data) {
    super(data);
    this.component = data.component;
    this.ducats = typeof data.ducats !== 'undefined' ? data.ducats : '0';
    this.locations = data.location;
    this.type = 'Prime Part';
  }

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

  addAll(locations) {
    for (const location of locations) {
      if (location) {
        this.addLocation(location);
      }
    }
  }

  toString() {
    const extraSpace = '　　';
    return `${this.component} worth ${this.ducats}: ${md.lineEnd}${extraSpace}${this.locations.sort(RelicSort).join(`,${md.lineEnd}${extraSpace}`)}`;
  }
}

module.exports = PrimePart;
