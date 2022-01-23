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

//---------------------Draggable stuff
// Inspired from https://codepen.io/dcode-software/pen/xxwpLQo

const droppableArea = document.getElementById('droppable-area');
const droppableInput = document.getElementById('droppable-input');

droppableArea.addEventListener("click", (e) => {
  droppableInput.click();
});

droppableInput.addEventListener("change", (e) => {
  if (droppableInput.files.length) {
    updateThumbnail(droppableArea, droppableInput.files[0]);
  }
});

droppableArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  droppableArea.classList.add("droppable-area-hovered");
});

["dragleave", "dragend"].forEach((type) => {
  droppableArea.addEventListener(type, (e) => {
    droppableArea.classList.remove("droppable-area-hovered");
  });
});

droppableArea.addEventListener("drop", (e) => {
  e.preventDefault();

  if (e.dataTransfer.files.length) {
    droppableInput.files = e.dataTransfer.files;
    updateThumbnail(droppableArea, e.dataTransfer.files[0]);
  }

  droppableArea.classList.remove("droppable-area-hovered");
});


function updateThumbnail(droppableArea, file) {
  let previewElement = document.getElementById("droppable-item-preview");

  if (!previewElement) {
    previewElement = document.createElement("div");
    previewElement.id ="droppable-item-preview";
    droppableArea.appendChild(previewElement);
  }

  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      previewElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    previewElement.style.backgroundImage = null;
  }
}
