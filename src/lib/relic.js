var md = require('node-md-config');

var _utils = require('./_utils.js');
var toTitleCase = require('./_utils.js').toTitleCase;

var locationsFromJson = function(locations){
  var locListReturn = [];
  for(var i in locations){
    var location = padLocation(i) + " | "
    var tokens = [];
    for(j in locations[i]){
      if(locations[i][j][1] === ""){
        tokens.push(locations[i][j][0]);
      } else {
        tokens.push(locations[i][j][0] + " ("+locations[i][j][1].toLowerCase()+")");
      }
    }
    locListReturn.push(location + tokens.join(', '));
  }
  return locListReturn;
}

var Relic = function(name, locations){
  var LocationQuery = require('../../index.js');
  var relicCheckr = new LocationQuery();
  var relicVaulted = relicCheckr.relicHasDropLocation();
  this.name = toTitleCase(name) + (relicVaulted ? "(Vaulted)" : "");
  this.locations = relicVaulted ? ["Prime Vault"] : locationsFromJson(locations);
  this.type = 'Relic';
}

Relic.prototype.toString = function() {
  return this.name + ": "+md.lineEnd+"　　" + 
    this.locations.join(","+md.lineEnd+"　　");
}

var padLocation = function(locationString){
  if(locationString.length < "Derelict".length){
    return padLocation(locationString + " ");
  } else {
    return locationString;
  }
}

module.exports = Relic;