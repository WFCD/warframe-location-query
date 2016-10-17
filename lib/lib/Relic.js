'use strict';

const md = require('node-md-config');
const toTitleCase = require('./_utils.js').toTitleCase;
const Item = require('./Item.js');

function padLocation(locationString) {
  let str;
  if (locationString.length < 8) {
    str = padLocation(`${locationString} `);
  } else {
    str = locationString;
  }
  return str;
}

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


class Relic extends Item {
  constructor(data) {
    super();
    const relicIsVaulted = data.locations === '';
    this.component = `${toTitleCase(data.component)}${(relicIsVaulted ? ' - Vaulted' : '')}`;
    this.locations = relicIsVaulted ? ['Prime Vault'] : locationsFromJson(data.locations);
    this.type = 'Relic';
  }

  toString() {
    const extraSpace = '　　';
    return `${this.name}: ${md.lineEnd}${extraSpace}
      ${this.locations.join(`,${md.lineEnd}${extraSpace}`)}`;
  }
}

module.exports = Relic;
