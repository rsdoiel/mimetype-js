//
// mongo-mimetype_test.js - tests for mimetype.js module for Mongo Shell 2.2.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under the Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//

var assert = require('assert'),
    path = require('path'),
    harness = require('harness'),
    v0_0_3, // = require('../lib/v0.0.3').data,
    mimetype = require('mimetype'),
    module = {
    	filename: "mongo-mimetype_test.js"
    };

load("./lib/v0.0.3.js");

var getKeys = function (obj) {
	var results = [], ky;
	for (ky in obj) {
		if (obj.hasOwnProperty(ky)) {
			results.push(ky);
		}
	}
	
	return results;
};

// Tests for version 0.0.2
harness.push({callback: function () {    
        assert.equal(mimetype.lookup("myfile.txt"), 'text/plain', "lookup should return text/plain");
        assert.equal(mimetype.set('.exotic', 'x-application/experimental'), true, "set should return true.");
        assert.equal(mimetype.lookup("myfile.exotic"), "x-application/experimental", "lookup should return x-application/experimental");
        assert.equal(mimetype.del('.exotic'), true, "del() should return true");
        assert.equal(mimetype.lookup("myfile.exotic"), false, "lookup(myfile.exotic) should return false now");
        ky_cnt = (getKeys(mimetype.catalog)).length;
        i = 0;
        mimetype.forEach(function (ext, mime_type_string) {
            assert.ok(ext, "Should have an ext");
            assert.ok(mime_type_string, "Should have a mime_type string");
            assert.strictEqual(mimetype.catalog[ext], mime_type_string);
            i += 1;
        });
        assert.equal(ky_cnt, i, "i should equal ky_cnt");
        
        // Test multi-extension set()
        assert.equal(mimetype.lookup("test.txt1"), false, "Should not have the .txt1 defined yet.");
        assert.equal(mimetype.lookup("test.txt2"), false, "Should not have the .txt2 defined yet.");
        assert.equal(mimetype.lookup("test.txt3"), false, "Should not have the .txt3 defined yet.");
        mimetype.set(".txt1,.txt2,.txt3", "text/plain");
        assert.equal(mimetype.lookup("test.txt1"), "text/plain", "Should have the .txt1 now.");
        assert.equal(mimetype.lookup("test.txt2"), "text/plain", "Should have the .txt2 now.");
        assert.equal(mimetype.lookup("test.txt3"), "text/plain", "Should  have the .txt3 now.");
        assert.equal(mimetype.lookup("this.isNotDefined"), false, "Should not have a mime type defined for this.isNotDefined");
        assert.equal(mimetype.lookup("this.isNotDefined", false, "text/plain"), "text/plain", "Should not have a mime type defined for this.isNotDefined");
        assert.equal(mimetype.lookup("this.isNotDefined", true, "text/plain"), "text/plain; charset=UTF-8", "Should have a mime type with charset defined for this.isNotDefined: " + mimetype.lookup("this.isNotDefined", true, "text/plain"));
        assert.equal(mimetype.lookup("this.isNotDefined", "UTF-8", "text/plain"), "text/plain; charset=UTF-8", "this.isNotDefined should be text/plain;charset=UTF-8: " + mimetype.lookup("this.isNotDefined", "UTF-8", "text/plain"));
        
        assert.equal(mimetype.lookup("README"), "text/plain", "README should return text/plain mime-type.");
        assert.equal(mimetype.lookup("manifest"), "text/cache-manifest", "manifest should return text/plain mime-type.");
        harness.completed("tests for version 0.0.2");
}, label: "tests for version 0.0.2"});

console.log("Testing version 0.0.3 test.");
// tests for version 0.0.3
harness.push({callback: function () {
	var ky, obj_test;
	
	obj_test = function (i) {
		var vals, j, testname;
		
		assert.ok(v0_0_3[i].mime_type, "Missing v0_0_3 index:" + i);
		if (v0_0_3[i].ext !== undefined) {
			if (v0_0_3[i].ext.indexOf(" ") > 0) {
				vals = v0_0_3[i].ext.split(" ");
				for (j = 0; j < vals.length; j += 1) {
					testname = ["testname", vals[j]].join(".");
					assert.equal(
						mimetype.lookup(testname), 
						v0_0_3[i].mime_type, 
						[testname, mimetype.lookup(testname), '->', v0_0_3[i].mime_type, vals[j], "failed"].join(" "));
				}
			} else {
				testname = ["testname", v0_0_3[i].ext].join(".");
				assert.equal(
					mimetype.lookup(testname),
					v0_0_3[i].mime_type, 
					[testname, v0_0_3[i].mime_type, "failed"].join(" "));
			}
		}
	};
	
	for (ky in v0_0_3) {
		if (v0_0_3.hasOwnProperty(ky)) {
			obj_test(ky);
		}
	}
    harness.completed("tests for version 0.0.3");
}, label: "tests for version 0.0.3"});

harness.RunIt(path.basename(module.filename), 10);
