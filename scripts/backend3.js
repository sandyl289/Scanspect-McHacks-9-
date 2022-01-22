const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const vision = require('@google-cloud/vision');

const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});
   
app.post('/upload', (req, res, next) => {
    
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){

        console.log("files:");
        console.log(files);

        let newPath = path.join(__dirname, '../uploads') + '/' + files.imgInput.originalFilename;
        let rawData = fs.readFileSync(files.imgInput.filepath);
      
        fs.writeFile(newPath, rawData, function(err){
            if (err) {
              console.log(err);
              return res.send("Upload failed");
            } else return res.send("Successfully uploaded")
        })
  })
});

app.listen(3000, function(err){
    if(err) console.log(err)
    else console.log('Server listening on Port 3000');
});