var PrimePart = require('./lib/primePart.js');
var Relic = require('./lib/relic.js');

var ComponentHandler = function (data) {
  this.components = new Array();
  var self = this;
  if (typeof data.length !== 'undefined') {
    data.forEach(function (reliquary) {
      var primeReg = /prime\s?parts?/i;
      var relicReg = /relics?/i
      if (primeReg.test(reliquary.type)) {
        this.components.push(new PrimePart(reliquary.component, reliquary.ducats, reliquary.location));
      }
      else if (relicReg.test(reliquary.type)) {
        this.components.push(new Relic(reliquary.component, reliquary.location));
      }
    });
  }
}

ComponentHandler.prototype.toString = function () {
  var componentString = md.codeMulti;
  componentString += this.components.join(md.doubleReturn);
  if (componentString === md.codeMulti) {
    componentString += "Operator, no relics available for that query.";
  }
  componentString += md.blockEnd;
  return componentString;
}

ComponentHandler.prototype.getAll = function(){
  return this.components;
}

module.exports = ComponentHandler;