var fs = require("fs");
var writestream = fs.createWriteStream("output.txt");

writestream.write("gfdsa");

writestream.end();
writestream.on('finish', function() {});