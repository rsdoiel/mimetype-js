//
// mimetype_test.js - tests for mimetype.js module
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under New the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
// revision: 0.0.1
//

var assert = require('assert'),
  mimetype = require('./mimetype');

console.log("Starting tests [mimetype.js] ...", new Date());

assert.equal(mimetype.lookup("myfile.txt"), 'text/plain', "lookup should return text/plain");
assert.equal(mimetype.set('.exotic', 'x-application/experimental'), true, "set should return true.");
assert.equal(mimetype.lookup("myfile.exotic"), "x-application/experimental", "lookup should return x-application/experimental");
assert.equal(mimetype.del('.exotic'), true, "del() should return true");
assert.equal(mimetype.lookup("myfile.exotic"), false, "lookup(myfile.exotic) should return false now");
ky_cnt = Object.keys(mimetype.catalog).length;
i = 0;
mimetype.forEach(function (ext, mime_type_string) {
	assert.ok(ext, "Should have an ext");
	assert.ok(mime_type_string, "Should have a mime_type string");
	assert.strictEqual(mimetype.catalog[ext], mime_type_string);
	i += 1;
});
assert.equal(ky_cnt, i, "i should equal ky_cnt");

console.log("Success!", new Date());
