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
    console.log("result: " + res.data);
    console.log("result (bool): " + (res.data === "potato"));
    if (res.data === "potato")  {
      document.getElementById('result').innerText = "This is a potato (☞ﾟヮﾟ)☞";
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
  
// Display image
imgInput.onchange = function () {
  let preview = document.getElementById('preview');
  preview.src = window.URL.createObjectURL(this.files[0]);
  preview.classList.remove('d-none');
}

function audioYes() {
  let audioObjYes = new Audio('audio/thisPotato.mp3');
  audioObjYes.play();
}

function audioNo() {
  let audioObjNo = new Audio('audio/notPotato.mp3');
  audioObjNo.play();
}
//---------------------Draggable stuff
/*
document.getElementById(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});*/
