[![build status](https://secure.travis-ci.org/rsdoiel/mimetype-js.png)](http://travis-ci.org/rsdoiel/mimetype-js)
mimetype-js
===========

# Overview

I find keep making these file extension lookup tables for mime types.  It's 
about time I put it in a module to save me the trouble.

# Examples

## general case

```JavaScript
	var mimetype = require('mimetype');
	
	console.log(mimetype.lookup("myfile.txt")); // Should display text/plain
	mimetype.set('.exotic', 'x-application/experimental'); // Add/update a mime type in the catalog
	console.log(mimetype.lookup("myfile.exotic")); // Should display x-application/experimental
	mimetype.del('.exotic'); // Removes the mime type from the catalog
	console.log(mimetype.lookup("myfile.exitoc")); // Should display false
	mimetype.forEach(function (ext, mime_type_string) {
		console.log(ext, mime_type_string); // Display the extension and matching mimetype in catalog
	});
```

## Special cases

Sometimes detecting by filename extensions isn't work and you want to 
default to a general purposes mime-type (e.g. text/plain, application/octet-stream).

```JavaScript
	var mimetype = require('mimetype');
	
	// This should display 0 (false)
	console.log(mimetype.lookup("filename.unknownMimeType");
	// This should display the string text/plain
	console.log(mimetype.lookup("filename.unknownMimeType", false, "text/plain");
	// This should display the string text/plain; charset=UTF-8
	console.log(mimetype.lookup("filename.unknownMimeType", "UTF-8", "text/plain");
```

## Using mimetype.js with MongoDB Shell

While this was implemented as a NodeJS module it also works under MongoDB's shell.
Instead of including with a "require" you would load the JavaScript file _load-mimetype.js_.

```JavaScript
	load("./extras/load-mimetype.js");
	print("Check the mime type of test.txt:" + MimeType.lookup("test.txt"));
```

This would display something like-

```shell
	MongoDB shell version: 2.2.0
	connecting to: test
	> load("./extras/load-mimetype.js");
	> print("Check the mime type of test.txt: " + MimeType.lookup("test.txt"));
	Check the mime type of test.txt: text/plain
	> 
```
