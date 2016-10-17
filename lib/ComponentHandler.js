'use strict';

const md = require('node-md-config');
const PrimePart = require('./lib/Prime.js');
const Relic = require('./lib/Relic.js');

class ComponentHandler {
  constructor(data) {
    this.components = [];
    const self = this;
    if (typeof data !== 'undefined' && data != null) {
      data.forEach((reliquary) => {
        const primeReg = /prime\s?parts?/i;
        const relicReg = /relics?/i;
        if (primeReg.test(reliquary.type)) {
          self.components.push(new PrimePart(reliquary));
        } else if (relicReg.test(reliquary.type)) {
          self.components.push(new Relic(reliquary.component, reliquary.location));
        }
      });
    }
  }

  toString() {
    let componentString = md.codeMulti;
    const maxLen = 4;
    const listToJoin = [];
    this.components.forEach((component) => {
      if (component.type === 'Relic' && listToJoin.length >= 1) {
        // skip
      } else {
        listToJoin.push(component);
      }
    });

    componentString += listToJoin.slice(0, maxLen).join(md.doubleReturn);
    if (componentString === md.codeMulti) {
      componentString += 'Operator, no relics available for that query.';
    }
    if (this.components.length > maxLen) {
      componentString += `${md.doubleReturn}Your query returned more results than I can display, operator. Refine your search for more accurate results.`;
    }
    componentString += md.blockEnd;
    return componentString;
  }

  toStringList() {
    const componentStringList = [];
    const maxLen = 4;
    this.components.forEach((component) => {
      if (component.type === 'Relic' && componentStringList.length >= 3) {
        // skip
      } else {
        const compStr = component.toString();
        componentStringList.push(compStr);
      }
    });
    
    if (componentStringList.length < 1) {
      componentStringList.push('Operator, no relics available for that query.');
    }
    
    if (this.components.length > maxLen) {
      componentStringList.push('Your query returned more results than I can display, operator. Refine your search for more accurate results.');
    }
    return componentStringList;
  }
  
  getAll() {
    return this.components;
  }
}

module.exports = ComponentHandler;
