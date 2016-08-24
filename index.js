var request = require('request');
var md = require('node-md-config');
var jsonQuery = require('json-query');

var ComponentHandler = require('./src/componentHandler.js')

var setRelicValForCompare = require('./src/lib/_utils.js').setRelicValForCompare;
var toTitleCase = require('./src/lib/_utils.js').toTitleCase;

var maxCacheLength = process.env.LOCATION_MAX_CACHED_TIME || 60000;

var LocationQuery = function () {
  this.cache = null;
  this.lastRefresh = null;
  this.refreshing = false;
  this.refreshQueue = [];
}

LocationQuery.prototype.dataIsCurrent = function() {
  return this.cache &&
     Date.now() - this.cache.creation < maxCacheLength
}

LocationQuery.prototype.getData = function(callback) {
  if(this.dataIsCurrent()) {
    callback(null, this.cache);
  } else {
    this.refresh(callback);
  }
}

LocationQuery.prototype.refresh = function(callback) {
  var self = this;

  this.refreshQueue.push(callback);
  if(!this.refreshing) {
    this.refreshing = true;

    this.retrieve(function(err, data) {
      if(!err) {
        self.cache = data;
        self.lastRefresh = Date.now();
      }
      self.refreshing = false;
      self.processRefreshQueue(err, data);
    });
  }
}

LocationQuery.prototype.retrieve = function(callback) {
  var url = 'http://xenogelion.com/Hidden/Relics.json';
  var self = this;
  request.get(url, function(err, response, body) {
    if(err) {
      return callback(err);
    }
    if(response.statusCode !== 200) {
      var error
      error = new Error(url + ' returned HTTP status ' + response.statusCode)
      return callback(error);
    }
    var data

    try {
      data = JSON.parse(body);
    } catch(e) {
      data = null;
    }

    if(!data) {
      var error
      error = new Error('Invalid JSON from ' + url);
      return callback(error);
    }
    callback(null, data);
  });
}

LocationQuery.prototype.processRefreshQueue = function(err, data) {
  while(this.refreshQueue.length) {
    this.refreshQueue.shift()(err, data);
  }
}

LocationQuery.prototype.getLocationsForComponent = function(query, callback){
  this.getData(function(err, dataCache){
    var defaultString = md.codeMulti+"Operator, there is no such item location available."+md.blockEnd;
    if(err) {
      return callback(err, defaultString);
    }
    var results = jsonQuery('components[*component~/'+query+'/i]', {
      data: dataCache,
      allowRegexp: true
    });
    if(typeof results.value === 'undefined' || results == null){
      callback(new Error("No value for given query - LocationQuery.prototype.getLocationsForComponent"
                         , "warframe-location-query/index.js", 119), null);
      return;
    }
    this.componentHandler = new ComponentHandler(results.value);
    callback(null, this.componentHandler.toString());
  });
}

module.exports = LocationQuery;