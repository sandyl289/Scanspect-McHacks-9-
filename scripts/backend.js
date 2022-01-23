const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const vision = require('@google-cloud/vision');

const app = express();

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: '../VisionKeys.json'
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use(express.static('../assets/'));


app.post('/upload', (req, res, next) => {
    
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){

        let newPath = path.join(__dirname, '../uploads') + '\\' + files.imgInput.originalFilename;
        let rawData = fs.readFileSync(files.imgInput.filepath);
      
        fs.writeFile(newPath, rawData, function(err){
            if (err) {
              console.log(err);
              return res.send("Upload failed");
            } else {
              console.log("Successfully uploaded");

              client
              .labelDetection(newPath)
              .then(results => {
                const labels = results[0].labelAnnotations;

              let potato = false;

                console.log('\n------------Labels:');
                labels.forEach(label => {
                  console.log(label.description);
                  if (label.description == 'Potato') {
                    potato = true;
                  }
                });

                // Delete file
                fs.unlinkSync(newPath);

                if (potato) return res.send("potato");
                else return res.send("not");

              })
              .catch(err => {
                console.error('ERROR:', err);
                res.send("Error: " + err);
              });
            }
        });
    });
});

app.listen(3000, function(err){
    if(err) console.log(err)
    else console.log('Server listening on Port 3000');
});