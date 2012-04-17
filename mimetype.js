//
// mimetype.js - A catalog object of mime types based on file extensions
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under New the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
// revision: 0.0.0
//

(function () {
  var self = { catalog: {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.png': 'image/png'
  }};
  
  self.set = function (ext, mime_type_string) {
    self.catalog[ext] = mime_type_string;
    return (self.catalog[ext] !== undefined);
  };
  
  self.del = function (ext) {
    delete self.catalog[ext];
    return (self.catalog[ext] === undefined);
  }

  self.forEach = function (callback) {
      Object.keys(self.catalog).forEach(function (ext) 
      {
        callback(ext, self.catalog[ext]);
      });
      return self.catalog;
  };
  
  if (exports === undefined) {
    exports = {};
  }
  
  exports.catalog = self.catalog;
  exports.set = self.set;
  exports.del = self.del;
  exports.forEach = self.forEach;
  
  return exports;
}())
