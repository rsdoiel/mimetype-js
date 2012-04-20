mimetype-js
===========
revision 0.0.2
--------------

# Overview

I find keep making these file extension lookup tables for mime types.  It's about time I put it in a module
to save me the trouble.

# Example general case.

    var mimetype = require('mimetype');

    console.log(mimetype.lookup("myfile.txt")); // Should display text/plain
    mimetype.set('.exotic', 'x-application/experimental'); // Add/update a mime type in the catalog
    console.log(mimetype.lookup("myfile.exotic")); // Should display x-application/experimental
    mimetype.del('.exotic'); // Removes the mime type from the catalog
    console.log(mimetype.lookup("myfile.exitoc")); // Should display false
    mimetype.forEach(function (ext, mime_type_string) {
      console.log(ext, mime_type_string); // Display the extension and matching mimetype in catalog
    });

# Special cases

Sometimes detecting by filename extensions isn't work and you want to 
default to a general purposes mime-type (e.g. text/plain, application/octet-stream).

	var mimetype = require('mimetype');
	
	// This should display 0 (false)
	console.log(mimetype.lookup("filename.unknownMimeType");
	// This should display the string text/plain
	console.log(mimetype.lookup("filename.unknownMimeType", false, "text/plain");
	// This should display the string text/plain; charset=UTF-8
	console.log(mimetype.lookup("filename.unknownMimeType", "UTF-8", "text/plain");

