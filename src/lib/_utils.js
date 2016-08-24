var toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var setRelicValForCompare = function (a) {
  var lithReg = /lith/ig;
  var mesoReg = /meso/ig;
  var neoReg = /neo/ig;
  var axiReg = /axi/ig;
  if (lithReg.test(a)) return 0;
  else if (mesoReg.test(a)) return 1;
  else if (neoReg.test(a)) return 2;
  else if (axiReg.test(a)) return 3;
  else return 4;
}

var relicSort = function (a, b) {
  var aVal = setRelicValForCompare(a);
  var bVal = setRelicValForCompare(b);
  if (aVal < bVal) return -1;
  else if (aVal === bVal) return 0;
  else if (aVal > bVal) return 1;
}

module.exports = {
  toTitleCase
  , setRelicValForCompare
  , relicSort
}