mimetype-js
===========
revision 0.0.1
--------------

# Overview

I find keep making these file extension lookup tables for mime types.  It's about time I put it in a module
to save me the trouble.

# Example

    var mimetype = require('mimetype');

    console.log(mimetype.lookup("myfile.txt")); // Should display text/plain
    mimetype.set('.exotic', 'x-application/experimental'); // Add/update a mime type in the catalog
    console.log(mimetype.lookup("myfile.exotic")); // Should display x-application/experimental
    mimetype.del('.exotic'); // Removes the mime type from the catalog
    console.log(mimetype.lookup("myfile.exitoc")); // Should display false
    mimetype.forEach(function (ext, mime_type_string) {
      console.log(ext, mime_type_string); // Display the extension and matching mimetype in catalog
    });

