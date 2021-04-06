const stringCutter = function(str) {
  if (typeof str !== 'string') return `${str} - не строка!`;
  str = str.trim();
  if (str.length > 30) {
    str = str.slice(0, 30) + '...';
  }
  return str;
}

console.log(stringCutter('123456789-123456789-123456789-1'));
console.log(stringCutter(12));