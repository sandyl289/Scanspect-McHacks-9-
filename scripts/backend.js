var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const vision = require('@google-cloud/vision');
var express = require('express')
var app = express()

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
        // File uploaded
        res.write('File uploaded and moved!');

        // Performs label detection on the image file
        client
        .labelDetection(newpath)
        .then(results => {
          const labels = results[0].labelAnnotations;

          console.log('\n------------Labels:');
          let potato = false;
          labels.forEach(label => {
            console.log(label.description);
            if (label.description == 'Potato') {
              potato = true;
            }
          });
          
              // console.log(label.description) 
          if (potato) {
            console.log("This is a potato (☞ﾟヮﾟ)☞")
          } else {
            console.log("This is not a Potato ಥ_ಥ")
          }
          res.write('Test');
        })
          
        .catch(err => {
          console.error('ERROR:', err);
        });


        res.end();
      });
 });
  } else {
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    // res.write('<input type="file" name="filetoupload"><br>');
    // res.write('<input type="submit">');
    // res.write('</form>');
    // return res.end();

    app.get('/index.html', function (req, res) {
      res.send('index.html');
    });
    
    return res.end();
  }
}).listen(8080);