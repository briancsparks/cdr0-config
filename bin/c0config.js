#!/usr/bin/env node

const { isnt }                = require('../lib/extern/sg');
const { mkCONFIG, mkARGV }    = require('..');

const ARGV                    = mkARGV();

// The caller can pass in a different argv array, after ---
let   configOpts  = ARGV.extracts('___');
const CONFIG      = mkCONFIG(configOpts);

// Get the result
let   result = CONFIG(ARGV._[0] || '');
// console.log({ARGV, result});

// Default is first item after '--';
if (isnt(result)) {
  if (Array.isArray(ARGV.__)) {
    result = ARGV.__[0];
  }
}

// Exit and output
let exitCode = 9;
if (!isnt(result)) {
  exitCode = 0;
  console.log(result);
}

process.exit(exitCode);


