var md = require('node-md-config');
var PrimePart = require('./lib/primePart.js');
var Relic = require('./lib/relic.js');

var ComponentHandler = function (data) {
  this.components = new Array();
  var self = this;
  if (typeof data !== 'undefined' && data != null) {
    data.forEach(function (reliquary) {
      var primeReg = /prime\s?parts?/i;
      var relicReg = /relics?/i;
      if (primeReg.test(reliquary.type)) {
        self.components.push(new PrimePart(reliquary.component, reliquary.ducats, reliquary.location));
      }
      else if (relicReg.test(reliquary.type)) {
        self.components.push(new Relic(reliquary.component, reliquary.location));
      }
    });
  }
}

ComponentHandler.prototype.toString = function () {
  var componentString = md.codeMulti;
  var maxLen = 4;
  var self = this;
  var listToJoin = [];
  this.components.forEach(function(component){
    if(component.type === 'Relic' && listToJoin.length >= 1){
      //skip
    }else{
      listToJoin.push(component);
    }
  });

  componentString += listToJoin.slice(0,maxLen).join(md.doubleReturn);
  if (componentString === md.codeMulti) {
    componentString += "Operator, no relics available for that query.";
  }
  if(this.components.length > maxLen){
    componentString+= md.doubleReturn+"Your query returned more results than I can display, operator. Refine your search for more accurate results.";
  }
  componentString += md.blockEnd;
  return componentString;
}

ComponentHandler.prototype.toStringList = function() {
  var componentStringList = [];
  var maxLen = 4;
  var self = this;
  this.components.forEach(function(component){
    if(component.type === 'Relic' && componentStringList.length >= 3){
      //skip
    }else{
      componentStringList.push(component.toString());
    }
  });

  if (componentStringList === []) {
    componentStringList.push("Operator, no relics available for that query.");
  }
  if(this.components.length > maxLen){
    componentStringList.push("Your query returned more results than I can display, operator. Refine your search for more accurate results.");
  }
  return componentStringList;
}

ComponentHandler.prototype.getAll = function(){
  return this.components;
}

module.exports = ComponentHandler;