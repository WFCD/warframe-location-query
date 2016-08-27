var md = require('node-md-config');

var toTitleCase = require('./_utils.js').toTitleCase;
var RelicSort =  require('./_utils.js').relicSort;

var PrimePart = function(name, ducats, location){
  this.name = toTitleCase(name);
  this.ducats = typeof ducats !== 'undefined' ? ducats : '0' ;
  this.locations = [];
  this.type = 'Prime Part';
  this.isVaulted = false;
  var self = this;
  location.forEach(function(relic){
    var LocationQuery = require('../../index.js');
    var relicCheckr = new LocationQuery();
    var relicBase = relic.replace(/\(\w+\)/i, '').replace(/relic/i, '').toLowerCase().trim();
    relicCheckr.relicHasDropLocation(relicBase, function(err, relicHasDropLocation){
      if(err) {
        console.err(err);
      }
      console.log(self.isVaulted);
      self.isVaulted = !relicHasDropLocation;      
    })
    var stringToPush = relic + (self.isVaulted  ? "  - Vaulted" : "");
    self.locations.push(stringToPush);
  });
}


PrimePart.prototype.addLocation = function(locationToAdd){
  var self = this;
  var locationInLocations = false;
  self.locations.forEach(function(existingLocation){
    if((locationToAdd.toLowerCase() === existingLocation.toLowerCase())){
      relicInRelics = true;
    }
  });
  if(!locationInLocations){
    self.locations.push(locationToAdd);
  }
}

PrimePart.prototype.addAll = function(locations){
  for(i in locations){
    this.addLocation(locations[i]);
  }
}

PrimePart.prototype.toString = function() {
  return this.name +" worth "+ this.ducats + ": "+md.lineEnd+"　　" + 
    this.locations.sort(RelicSort).join(","+md.lineEnd+"　　");
}

module.exports = PrimePart;