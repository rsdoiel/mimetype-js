//
// mimetype.js - A catalog object of mime types based on file extensions
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under New the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
// revision: 0.0.2
//

(function (exports) {
	var path;
	
	// If we're NodeJS I can use the path module.
	// If I'm MongoDB shell, not available.
	if (require !== undefined) {
		path = require('path');
	}
	
	var self = { 
		charset: 'UTF-8',
		catalog: {}
	};
	
	if (exports === undefined) {
		exports = {};
	}

	self.lookup = function (fname, include_charset, default_mime_type) {
		var ext, charset = this.charset;
		
		if (include_charset === undefined) {
			include_charset = false;
		}
		
		if (typeof include_charset === "string") {
			charset = include_charset;
			include_charset = true;
		}

		if (path.extname !== undefined) {
			ext = path.extname(fname).toLowerCase();
		} else if (fname.lastIndexOf('.') > 0) {
			ext = fname.substr(fname.lastIndexOf('.')).toLowerCase();
		} else {
			ext = fname;
		}
		
		// Handle the special cases where their is no extension
		// e..g README, manifest, LICENSE, TODO
		if (ext == "") {
			ext = fname;
		}

		if (self.catalog[ext] !== undefined) {
			if (include_charset === true && 
				self.catalog[ext].indexOf('text/') === 0 &&
				self.catalog[ext].indexOf('charset') < 0) {
				return self.catalog[ext] + '; charset=' + charset;
			} else {
				return self.catalog[ext];
			}
		} else if (default_mime_type !== undefined) {
			if (include_charset === true && 
				default_mime_type.indexOf('text/') === 0) {
				return default_mime_type + '; charset=' + charset;
			}
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

	// Quick and dirty list of common mime-types I've run across
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
	self.set('.doc,.docx', 'application/msword');
	self.set('.xls', 'application/excel');
	self.set('.ppt', 'application/powerpoint');
	self.set('.bin', 'application/octet-stream');
	self.set('.pdf', 'application/pdf');
	self.set('.rtf', 'application/rtf');
	self.set(".ai,.eps,.ps", "application/postscript");
	self.set(".tar", "application/x-tar");
	self.set(".gz", "application/x-gzip");
	self.set(".tar.gz,.tgz", "application/x-tar-gz");
	self.set(".tar.bz,.tbz", "application/x-tar-bzip");
	self.set(".zip", "application/zip");
	self.set(".bz", "application/bzip");
	self.set(".au,.snd", "audio/basic");
	self.set(".wav", "audio/x-wav");
	self.set(".aif,.aiff,.aifc", "audio/x-aiff");
	self.set(".ogx", "application/ogg");
	self.set(".ogg,.spx,.oga", "audio/ogg");
	self.set(".ogv", "video/ogg");
	self.set(".mp3,.mp2,.mpga", "audio/mpeg");
	self.set(".rpm", "audio/x-pn-realaudio-plugin");
	self.set(".ram,.rm", "audio/x-pn-realaudio");
	self.set(".ra", "audio/x-realaudio");
	self.set(".flac", "audio/flac");
	self.set(".aac", "audio/x-aac");

	self.set(".gif", "image/gif");
	self.set(".jpg,.jpeg,.jpe", "image/jpeg");
	self.set(".png", "image/png");
	self.set(".tif,.tiff", "image/tiff");
	// Not sure if this is real for .raw files
	self.set(".raw", "image/x-raw");
	self.set(".mpg,.mpeg,.mpe", "video/mpeg");
	self.set(".mp4,.m4a", "video/mp4");
	self.set(".qt,.mov", "video/quicktime");
	self.set(".avi", "video/x-msvideo");
	self.set(".asf", "video/x-ms-asf");
	self.set(".asx", "video/x-ms-asx");
	self.set(".wmv", "video/x-ms-wmv");
	
	// Not really sure about these...
	self.set(".epub", "application/epub+zip");
	self.set(".mobi", "application/x-mobipocket-ebook");
		
	// Here's some common special cases without filename extensions
	self.set("README,LICENSE,COPYING,TODO,ABOUT,AUTHORS,CONTRIBUTORS", 
		"text/plain");
	self.set("manifest,.manifest,.mf,.appcache", "text/cache-manifest");

	exports.charset = self.charset;
	exports.catalog = self.catalog;
	exports.lookup = self.lookup;
	exports.set = self.set;
	exports.del = self.del;
	exports.forEach = self.forEach;
	
	return exports;
}(exports));
