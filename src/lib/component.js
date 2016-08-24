var Component = function(name, ducats, location){
  this.name = toTitleCase(name);
  this.ducats = ducats;
  this.locations = location;
}


Component.prototype.addLocation = function(locationToAdd){
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

Component.prototype.addAll = function(locations){
  for(i in locations){
    this.addLocation(locations[i]);
  }
}

Component.prototype.toString = function() {
  return this.name +" worth "+ this.ducats + ": "+md.lineEnd+"　　" + 
    this.locations.sort(RelicSort).join(","+md.lineEnd+"　　");
}

module.exports = Component;