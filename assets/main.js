//var axios = require("axios");

document.getElementById("test").onclick = function () {

  let fileInput = $("imgInput").files;

  let formData = new FormData(fileInput[0]);
  formData.append("image", fileInput);

  axios
  .post("localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
  })
  .then((res) => {
      console.log("this works!");
  })
  .catch((e) => {
      console.log(e.response.data);
  });

}
  