// Builds the UNCONVENTIONALISTS wordmark as SVG, traced from the Figma lettering:
// every letter is a black square with circles cut out of it.
// Run: node tools/build-wordmark.js  ->  writes wordmark.svg
const fs = require('fs');
const path = require('path');

const S = 100;   // letter size
const GAP = 8;   // white gap between letters

// [cx, cy, r] circles cut out of a 100x100 square
const glyphs = {
  U: [[50, 0, 34]],
  N: [[50, 100, 34]],
  C: [[100, 50, 34]],
  O: [[50, 50, 30]],
  V: [[0, 100, 48], [100, 100, 48]],
  E: [[100, 27, 17], [100, 73, 17]],
  T: [[0, 100, 38], [100, 100, 38]],
  I: [[0, 50, 32], [100, 50, 32]],
  A: [[50, 30, 13], [50, 100, 30]],
  L: [[100, 0, 62]],
  S: [[72, 0, 30], [28, 100, 30]],
};

const word = 'UNCONVENTIONALISTS';
const width = word.length * S + (word.length - 1) * GAP;

let defs = '';
let body = '';
[...word].forEach((ch, i) => {
  const x = i * (S + GAP);
  const id = `wm${i}`;
  const holes = glyphs[ch].map(([cx, cy, r]) => `<circle cx="${x + cx}" cy="${cy}" r="${r}" fill="#000"/>`).join('');
  defs += `<mask id="${id}"><rect x="${x}" y="0" width="${S}" height="${S}" fill="#fff"/>${holes}</mask>`;
  body += `<rect x="${x}" y="0" width="${S}" height="${S}" mask="url(#${id})"/>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${S}" fill="currentColor" role="img" aria-label="unconventionalists"><defs>${defs}</defs>${body}</svg>\n`;
fs.writeFileSync(path.join(__dirname, '..', 'wordmark.svg'), svg);
console.log(`wordmark.svg written (${width}x${S})`);
