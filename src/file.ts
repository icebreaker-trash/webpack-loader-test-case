const y = new Set([1, 2, 3, 4]) ;

console.log("file.js loaded");

function trigger() {
  console.log(...y);
}

module.exports = { y, trigger };
