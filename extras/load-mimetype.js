//
// load-mimetype.js - A shim for JavaScript shells that are missing various features
// (e.g. Mongo's JavaScript shell)
//

/*jslint devel: true, node: true, maxerr: 50, indent: 4, vars: true, sloppy: true */
var	exports, require;
if (load === undefined) {
	throw "Must support load()";
}

// Now that we have the objects methods we need, load sqlish
if (typeof load === "function") {
    load("./mimetype.js");
} else {
    throw "load() not a function.";
}
