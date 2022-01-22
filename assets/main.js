document.getElementById("test").onclick = function () {

  let fileInput = document.getElementById("imgInput").files[0];

  let formData = new FormData();
  formData.append("imgInput", fileInput);

  axios
  .post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
  })
  .then((res) => {
      console.log(res.data);
  })
  .catch((e) => {
      console.log(e.response.data);
  });

}
  