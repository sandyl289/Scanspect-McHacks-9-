// Submit image
document.getElementById("submit-image").onclick = function () {

  let fileInput = document.getElementById("imgInput").files[0];

  let formData = new FormData();
  formData.append("imgInput", fileInput);

  axios
  .post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
  })
  .then((res) => {
      console.log(res.data);
      document.getElementById('result').innerText = res.data;
  })
  .catch((e) => {
      console.log(e.response.data);
  });

}
  
// Display image
imgInput.onchange = function () {
  let preview = document.getElementById('preview');
  preview.src = window.URL.createObjectURL(this.files[0]);
  preview.classList.remove('d-none');
}
