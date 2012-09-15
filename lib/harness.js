//
// A simple test harness to run groups of tests as a simple setInterval
// service.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under Simplified the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
// revision: 0.0.1
//

var test_groups = [];

// Push a test batch into harness
exports.push = function (test) {
    if (test.callback === undefined) {
        throw "missing function definition.";
    }
    if (test.label === undefined) {
        throw "missing test label.";
    }
    test_groups.push(test);
};

exports.RunIt = function (module_name, test_delay) {
    var int_id;

    if (test_delay === undefined) {
        test_delay = 1000;
    }

    console.log("Starting [" + module_name.trim() + "] ...");
    int_id = setInterval(function () {
        var group_test = test_groups.shift();
    
        if (group_test && typeof group_test.callback === "function" &&
            typeof group_test.label === "string") {
            process.stdout.write("\tstarting " + group_test.label + " ...");
            group_test.callback();
            process.stdout.write(" OK\n");
        } else if (group_test === undefined) {
            process.stdout.write(module_name.trim() + " Success!\n");
            clearInterval(int_id);
        } else {
            throw module_name.trim() + " Failed!";
        }
    }, test_delay);
};

