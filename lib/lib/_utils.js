'use strict';

/**
 * Capitalize letters from a set of text
 * @param {string} txt Text to capitalize
 * @returns {string} Capitalized text
 */
function capitalizer(txt) {
  return `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`;
}

/**
 * Capitalize letters from a string, based on regex
 * @param {string} String to capitalize the first letters of individual words of
 * @returns {string} string that has had the first letters of each word capitalized
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, capitalizer);
}

/**
 * Get relic tier value for comparing relics
 * @param {string} a Relic component to get value of
 * @returns {number} value of the provided Relic component
 */
function setRelicValForCompare(a) {
  const lithReg = /lith/ig;
  const mesoReg = /meso/ig;
  const neoReg = /neo/ig;
  const axiReg = /axi/ig;
  let val;

  if (lithReg.test(a)) {
    val = 0;
  } else if (mesoReg.test(a)) {
    val = 1;
  } else if (neoReg.test(a)) {
    val = 2;
  } else if (axiReg.test(a)) {
    val = 3;
  } else {
    val = 4;
  }

  return val;
}

/**
 * Sort function for relics based on their values
 * @param {String} a Component of relic a
 * @param {String} b Component of relic b
 * @returns {number} -1, 0, or 1, based on the value of the provided components
 */
function relicSort(a, b) {
  const aVal = setRelicValForCompare(a);
  const bVal = setRelicValForCompare(b);
  let val;
  if (aVal < bVal) {
    val = -1;
  } else if (aVal === bVal) {
    val = 0;
  } else if (aVal > bVal) {
    val = 1;
  }
  return val;
}

module.exports = {
  toTitleCase,
  setRelicValForCompare,
  relicSort,
};
