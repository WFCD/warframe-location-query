'use strict';

function capitalizer(txt) {
  return `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`;
}

function toTitleCase(str) {
  const titleized = str.replace(/\w\S*/g, capitalizer);
  return titleized;
}

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
