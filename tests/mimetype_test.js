//
// mimetype_test.js - tests for mimetype.js module for NodeJS.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under the Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//

var Y = require("yui/test"),
    assert = Y.Assert,
    path = require('path'),
    v0_0_3 = require('../lib/v0.0.3').data,
    mimetype = require('../mimetype');

// Tests for version 0.0.2
var basicTests = new Y.Test.Case({
    name: "Basic Tests",
    "Should pass tests for version 0.0.2": function () {    
        assert.areEqual(mimetype.lookup("myfile.txt"), 'text/plain', "lookup should return text/plain");
        assert.areEqual(mimetype.set('.exotic', 'x-application/experimental'), true, "set should return true.");
        assert.areEqual(mimetype.lookup("myfile.exotic"), "x-application/experimental", "lookup should return x-application/experimental");
        assert.areEqual(mimetype.del('.exotic'), true, "del() should return true");
        assert.areEqual(mimetype.lookup("myfile.exotic"), false, "lookup(myfile.exotic) should return false now");
        ky_cnt = Object.keys(mimetype.catalog).length;
        i = 0;
        mimetype.forEach(function (ext, mime_type_string) {
            Y.assert(ext, "Should have an ext");
            Y.assert(mime_type_string, "Should have a mime_type string");
            assert.areSame(mimetype.catalog[ext], mime_type_string);
            i += 1;
        });
        assert.areEqual(ky_cnt, i, "i should equal ky_cnt");
        
        // Test multi-extension set()
        assert.areEqual(mimetype.lookup("test.txt1"), false, "Should not have the .txt1 defined yet.");
        assert.areEqual(mimetype.lookup("test.txt2"), false, "Should not have the .txt2 defined yet.");
        assert.areEqual(mimetype.lookup("test.txt3"), false, "Should not have the .txt3 defined yet.");
        mimetype.set(".txt1,.txt2,.txt3", "text/plain");
        assert.areEqual(mimetype.lookup("test.txt1"), "text/plain", "Should have the .txt1 now.");
        assert.areEqual(mimetype.lookup("test.txt2"), "text/plain", "Should have the .txt2 now.");
        assert.areEqual(mimetype.lookup("test.txt3"), "text/plain", "Should  have the .txt3 now.");
        assert.areEqual(mimetype.lookup("this.isNotDefined"), false, "Should not have a mime type defined for this.isNotDefined");
        assert.areEqual(mimetype.lookup("this.isNotDefined", false, "text/plain"), "text/plain", "Should not have a mime type defined for this.isNotDefined");
        assert.areEqual(mimetype.lookup("this.isNotDefined", true, "text/plain"), "text/plain; charset=UTF-8", "Should have a mime type with charset defined for this.isNotDefined: " + mimetype.lookup("this.isNotDefined", true, "text/plain"));
        assert.areEqual(mimetype.lookup("this.isNotDefined", "UTF-8", "text/plain"), "text/plain; charset=UTF-8", "this.isNotDefined should be text/plain;charset=UTF-8: " + mimetype.lookup("this.isNotDefined", "UTF-8", "text/plain"));
        
        assert.areEqual(mimetype.lookup("README"), "text/plain", "README should return text/plain mime-type.");
        assert.areEqual(mimetype.lookup("manifest"), "text/cache-manifest", "manifest should return text/plain mime-type.");
    },

    // tests for version 0.0.3
    "Should pass tests for version 0.0.3": function () {
        Object.keys(v0_0_3).forEach(function (i) {
            var vals, j, testname;
            
            Y.assert(v0_0_3[i].mime_type, "Missing v0_0_3 index:" + i);
            if (v0_0_3[i].ext !== undefined) {
                if (v0_0_3[i].ext.indexOf(" ") > 0) {
                    vals = v0_0_3[i].ext.split(" ");
                    for (j = 0; j < vals.length; j += 1) {
                        testname = ["testname", vals[j]].join(".");
                        assert.areEqual(
                            mimetype.lookup(testname), 
                            v0_0_3[i].mime_type, 
                            [testname, mimetype.lookup(testname), '->', v0_0_3[i].mime_type, vals[j], "failed"].join(" "));
                    }
                } else {
                    testname = ["testname", v0_0_3[i].ext].join(".");
                    assert.areEqual(
                        mimetype.lookup(testname),
                        v0_0_3[i].mime_type, 
                        [testname, v0_0_3[i].mime_type, "failed"].join(" "));
                }
            }
        });
    }
});

Y.Test.Runner.add(basicTests);
Y.Test.Runner.run();

