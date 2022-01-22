var axios = require("axios");

$('#test').click(function() {

  

  axios.post(
    'localhost:8080/fileupload',
    {},
    {
      headers: {
        'Content-Type': imageFile.type
      }
    }
  )
    .then(response => {
      console.log("this works!");
    })
    .catch(e => {
      console.log(e.response.data);
    });
})

      