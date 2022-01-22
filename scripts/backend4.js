var express = require('express');
var formidable = require('formidable');
var http = require('http');
var fs = require('fs');
var path = require('path');
var PORT = 3000;

var app = express();
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/fileupload', function (req, res) {

  // console.log("Line 15!")

  //   var form = new formidable.IncomingForm();
  //   form.parse(req, function (err, fields, files) {
  //       console.log('Hello! Line 19 from backend 2 ༼ つ ◕_◕ ༽つ');
  //       console.log('Error: ' +  err);
  //       console.log("fields:");
  //       console.log(fields);
  //       console.log("files:");
  //       console.log(files);
  //       var oldpath = files.filetoupload.filepath;
  //       console.log('Hello! Line 22 from backend 2 ༼ つ ◕_◕ ༽つ');
        
  //       var newpath = '../uploads/' + files.filetoupload.originalFilename;
  //       console.log('Hello! Line 25 from backend 2 ༼ つ ◕_◕ ༽つ');
  //       fs.rename(oldpath, newpath, function (err) {
  //           if (err) throw err;
  //           // File uploaded
  //           //res.write('File uploaded and moved!');

  //           // Performs label detection on the image file
  //           client
  //               .labelDetection(newpath)
  //               .then(results => {
  //                   const labels = results[0].labelAnnotations;

  //                   console.log('\n------------Labels:');
  //                   let potato = false;
  //                   labels.forEach(label => {
  //                       console.log(label.description);
  //                       if (label.description == 'Potato') {
  //                           potato = true;
  //                       }
  //                   });
        
  //                   // console.log(label.description) 
  //                   if (potato) {
  //                       console.log("This is a potato (☞ﾟヮﾟ)☞")
  //                   } else {
  //                       console.log("This is not a Potato ಥ_ಥ")
  //                   }
  //                   //res.write('Test');
  //               })
        
  //               .catch(err => {
  //                   console.error('ERROR:', err);
  //               });
  //       });
  //   });

  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log('Error: ' +  err);
      console.log("fields:");
      console.log(fields);
      console.log("files:");
      console.log(files);
        var oldpath = files.file.path;
        var newpath = fileUpModule.file.fileToUpload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        // File uploaded
        //res.write('File uploaded and moved!');

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
          //res.write('Test');
        })
          
        .catch(err => {
          console.error('ERROR:', err);
        });


        //res.end();
      });
 });

});
  
// app.listen(PORT, function(err){
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });