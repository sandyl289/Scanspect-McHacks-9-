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
  res.sendFile(path.join(__dirname, '../index.html'));
});
   
app.post('/upload', (req, res, next) => {
    
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){

        let newPath = path.join(__dirname, '../uploads') + '/' + files.imgInput.originalFilename;
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
                  console.log("This is a potato (☞ﾟヮﾟ)☞");
                } else {
                  console.log("This is not a Potato ಥ_ಥ");
                }

                // TODO: Delete file

              })
              .catch(err => {
                console.error('ERROR:', err);
              });

             return res.send("Complete");
            }
        });
    });
});

app.listen(3000, function(err){
    if(err) console.log(err)
    else console.log('Server listening on Port 3000');
});