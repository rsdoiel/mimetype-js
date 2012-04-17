//
// mimetype.js - A catalog object of mime types based on file extensions
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under New the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
// revision: 0.0.1
//

var path;
if (require !== undefined) {
	path = require('path');
}


(function () {
	var self = { 
		charset: 'UTF-8',
		catalog: {
			'.txt': 'text/plain',
			'.html': 'text/html',
			'.js': 'application/javascript',
			'.json': 'application/json',
			'.css': 'text/css',
			'.xml': 'text/xml',
			'.csv': 'text/csv',
			'.ico': 'image/icon',
			'.jpg': 'image/jpeg',
			'.png': 'image/png',
		}
	};
	
	self.lookup = function (fname, include_charset) {
		var ext;
		
		if (include_charset === undefined) {
			include_charset = false;
		}

		if (path.extname !== undefined) {
			ext = path.extname(fname);
		} else if (fname.lastIndexOf('.') > 0) {
			ext = fname.substr(fname.lastIndexOf('.'));
		} else {
			ext = fname;
		}

		if (self.catalog[ext] !== undefined) {
			if (include_charset === true && 
				self.catalog[ext].toLowerCase().indexOf('text/') === 0 &&
				self.catalog[ext].toLowerCase().indexOf('charset') < 0) {
				return self.catalog[ext] + '; charset=' + self.charset;
			} else {
				return self.catalog[ext];
			}
		}
		return false;
	};
		
	self.set = function (ext, mime_type_string) {
		self.catalog[ext] = mime_type_string;
		return (self.catalog[ext] !== undefined);
	};
	
	self.del = function (ext) {
		delete self.catalog[ext];
		return (self.catalog[ext] === undefined);
	}
	
	self.forEach = function (callback) {
		Object.keys(self.catalog).forEach(function (ext) {
			callback(ext, self.catalog[ext]);
		});
		return self.catalog;
	};
	
	if (exports === undefined) {
		exports = {};
	}

	exports.charset = self.charset;
	exports.catalog = self.catalog;
	exports.lookup = self.lookup;
	exports.set = self.set;
	exports.del = self.del;
	exports.forEach = self.forEach;
	
	return exports;
}());
