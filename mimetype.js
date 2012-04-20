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


(function (exports) {
	var self = { 
		charset: 'UTF-8',
		catalog: {}
	};
	
	if (exports === undefined) {
		exports = {};
	}

	self.lookup = function (fname, include_charset, default_mime_type) {
		var ext;
		
		if (include_charset === undefined ||
			include_charset === null) {
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
		if (default_mime_type !=== undefined) {
			return default_mime_type;
		}
		return false;
	};
		
	self.set = function (exts, mime_type_string) {
        var result = true;
        if (exts.indexOf(',')) {
            exts.split(',').forEach(function (ext) {
                ext = ext.trim();
                self.catalog[ext] = mime_type_string;
                if (self.catalog[ext] !== mime_type_string) {
                    result = false;
                }
            });
        } else {
            result = (self.catalog[exts] === mime_type_string);
        }
		return result;
	};
	
	self.del = function (ext) {
		delete self.catalog[ext];
		return (self.catalog[ext] === undefined);
	};
	
	self.forEach = function (callback) {
		Object.keys(self.catalog).forEach(function (ext) {
			callback(ext, self.catalog[ext]);
		});
		return self.catalog;
	};


	self.set('.txt,.text,.md,README','text/plain');
	self.set('.html,.htm', 'text/html');
	self.set('.js', 'application/javascript');
	self.set('.json', 'application/json');
	self.set('.css', 'text/css');
	self.set('.xml,.dtd', 'text/xml');
	self.set('.csv', 'text/csv');
	self.set('.tsv', 'text/tab-separated-value');
	self.set('.ico', 'image/icon');
	self.set('.jpg,.jpeg,.jpe', 'image/jpeg');
	self.set('.qt,.mov', 'video/quicktime');
	self.set('.mpg,.mpeg,.mpe', 'video/mpeg');
	self.set('.png', 'image/png');
	self.set('.doc', 'application/msword');
	self.set('.bin', 'application/octet-stream');
	self.set('.pdf', 'application/pdf');
	self.set('.rtf', 'application/rtf');
	self.set(".ai,.eps,.ps", "application/postscript");
	self.set(".tar", "application/x-tar");
	// What about .tar.gz?
	self.set(".zip", "application/zip");
	// What about gzip? bgzip?
	self.set(".au,.snd", "audio/basic");
	self.set(".wav", "audio/x-wav");
	self.set(".aif,.aiff,.aifc", "audio/x-aiff");
	// What about .aac, .mp3. .flac, .ogg?
	self.set(".git", "image/gif");
	self.set(".jpg,.jpeg,.jpe", "image/jpeg");
	self.set(".png", "image/png");
	self.set(".tif,.tiff", "image/tiff");
	// What about .raw?
	self.set(".tsv", "text/tab-separated-values");
	// What about .csv?
	self.set(".mpg,.mpeg,.mpe", "video/mpeg");
	self.set(".qt,.mov", "video/quicktime");
	self.set(".qvi", "video/x-msvideo");
	// What about .avi files? What about Theora files?
	// What About .epub, .mobi, .daisy?

	exports.charset = self.charset;
	exports.catalog = self.catalog;
	exports.lookup = self.lookup;
	exports.set = self.set;
	exports.del = self.del;
	exports.forEach = self.forEach;
	
	return exports;
}(exports));
