'use strict';

/**
 * Represents a generic object from the json at http://xenogelion.com/Hidden/Relics.json
 */
class Item {
 /**
  * @param {Object} data The object data specifying information
  */
  constructor(data) {
    this.component = data.component;
  }
  /**
   * Returns a string representation of the object
   * @returns {string}
   */
  toString() {
    return `component: ${this.component}`;
  }
}

module.exports = Item;
