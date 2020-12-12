
const mkARGV                                = require('./argv');
const libSgfs                               = require('./extern/sgfs');
const smart                                 = require('./extern/sg');
const { smartKey, smartValue }              = smart;
const { resolveIt, resolveItWithDeref }     = smart;

const sgfs = libSgfs.fs;

// ------------------------------------------------------------------------------------------------------------------------
// The mkCONFIG function
module.exports = function(optionsA ={}) {

  //const ARGV        = mkARGV(null, optionsA);
  const ARGV        = mkARGV(optionsA.___, optionsA);
  const startCwd    = resolveIt(optionsA.cwd) || process.cwd();
  const project     = optionsA.project;
  const custFnA     = optionsA.fn || function(){};

  return CONFIG;

  function CONFIG(name, optionsB ={}) {
    const custFnB     = optionsB.fn || function(){};

    let result;
    let filename;
    let name2;

    // command-line args have highest priority
    if (name in ARGV) {
      return ARGV[name];
    }

    // Maybe in the ENV
    if (name in process.env) {
      return smartValue(process.env[name]);
    }

    name2 = name.toUpperCase();
    if (name2 in process.env) {
      return smartValue(process.env[name2]);
    }

    name2 = `${project}_${name}`.toUpperCase();
    if (name2 in process.env) {
      return smartValue(process.env[name2]);
    }

    let json;

    const d = sgfs.dir(startCwd);
    const p = d.parent();

    json  = d.file('.config.json').include();
    if (json) {
      if (json[name]) {
        return json[name];
      }
    }
  }
};

// ------------------------------------------------------------------------------------------------------------------------
function include(pathname) {
  try {
    return require(pathname);
  }

  catch(err) {
    //console.error(`error including ${pathname}`);
  }
}



