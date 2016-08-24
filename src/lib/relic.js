var md = require('node-md-config');

var _utils = require('./_utils.js');
var RelicChecker = require('../../index.js');
var toTitleCase = require('./_utils.js').toTitleCase;

var locationsFromJson = function(locations){
  var locListReturn = [];
  consoel.log(locations);
  for(i in locations){
    var location = locations[i] + " | "
    var tokens = [];
    for(j in locations[i]){
      tokens.push(tolocations[i][0] + "("+locations[i][1]+")")
    }
    locListReturn.push(location + tokens.join(', '));
  }
}

var Relic = function(name, ducats, locations){
  var relicCheckr = new RelicChecker();
  var relicVaulted = false;
  relicCheckr.getData(function(err, datacache){
    if(err){
      return console.error(err);
    }
    else{
      var results = jsonQuery('components[*component~/'+query+'/i]', {
        data: dataCache,
        allowRegexp: true
      });
      if(typeof results.length === 'undefined' || results.length === 0 ){
        relicVaulted = true;
      }
    }
  });
  
  this.name = toTitleCase(name) + relicVaulted ? "(Vaulted)" : "";
  this.locations = locationsFromJson(locations);
}

Relic.prototype.addAll = function(locations){
  for(i in locations){
    this.addLocation(locations[i]);
  }
}

Relic.prototype.toString = function() {
  return this.name +" worth "+ this.ducats + ": "+md.lineEnd+"　　" + 
    this.locations.sort().join(","+md.lineEnd+"　　");
}

module.exports = Relic;