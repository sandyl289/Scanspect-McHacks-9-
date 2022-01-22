var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: '../VisionKeys.json'
});


http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = '../uploads/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');

        // File uploaded
        // Performs label detection on the image file
        client
        .labelDetection(newpath)
        .then(results => {
          const labels = results[0].labelAnnotations;

          console.log('Labels:');
          labels.forEach(label => console.log(label.description));
          res.write('Test');
        })
        .catch(err => {
          console.error('ERROR:', err);
        });


        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);