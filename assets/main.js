// Submit image
document.getElementById("submit-image").onclick = function() {

  let fileInput = document.getElementById("imgInput").files[0];

  let formData = new FormData();
  formData.append("imgInput", fileInput);

  

  axios
  .post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
  })
  .then((res) => {
    console.log("result: " + res.data);
    console.log("result (bool): " + (res.data === "potato"));
    if (res.data === "potato")  {
      document.getElementById('result').innerText = "☜(ﾟヮﾟ☜) This is a potato";
      audioYes();
    } else {
      document.getElementById('result').innerText = "This is not a Potato ಥ_ಥ";
      audioNo();
    }
    
   
  })
  .catch((e) => {
      console.log(e.response.data);
  });

}

// Select image
document.getElementById("choose-image").onclick = function() {
  document.getElementById("imgInput").click();
}


  
// Display image
imgInput.onchange = function () {
  let preview = document.getElementById('preview');
  preview.src = window.URL.createObjectURL(this.files[0]);
  preview.classList.remove('d-none');
  document.getElementById("submit-image").classList.remove("d-none");
}

// Audio

function audioYes() {
  let audioObjYes = new Audio('audio/thisPotato.mp3');
  audioObjYes.play();
}

function audioNo() {
  let audioObjNo = new Audio('audio/notPotato.mp3');
  audioObjNo.play();
}

