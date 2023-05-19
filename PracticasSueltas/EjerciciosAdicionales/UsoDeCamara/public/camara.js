const btnProduct = document.querySelector("#btn-foto");
btnProduct.addEventListener("click", captureImage);

const btnMessage = document.querySelector("#btn-video");
btnMessage.addEventListener("click", captureVideo);

function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            var videoElement = document.getElementById("video-element");
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(function (error) {
            console.log("Camera access denied: " + error);
        });
}

startCamera();

function captureImage() {
    let videoElement = document.getElementById("video-element");
    let canvasElement = document.createElement("canvas");
    canvasElement.width = 300; //videoElement.videoWidth;
    canvasElement.height = 200; //videoElement.videoHeight;
    let context = canvasElement.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    let dataURL = canvasElement.toDataURL("image/png");
    // Process the image data

    document.querySelector("#foto").innerHTML = `<img src="${dataURL}" alt="image">`;
    
    //const canvas = document.querySelector("canvas");
    //canvas.remove();
    canvasElement.remove();

    decodeImage(dataURL);


}

function captureVideo() {
    var videoElement = document.getElementById("video-element");
    var mediaRecorder = new MediaRecorder(videoElement.srcObject);
    var chunks = [];
    mediaRecorder.ondataavailable = function (event) {
        chunks.push(event.data);
    };
    mediaRecorder.onstop = function () {
        var blob = new Blob(chunks, { type: "video/mp4" });
        var url = URL.createObjectURL(blob);
        // Process the video data
    };
    mediaRecorder.start();
    setTimeout(function () {
        mediaRecorder.stop();
    }, 5000);
}

async function decodeImage(img) {
    //const compressedData = pako.gzip(JSON.stringify({ image: img }));

    const data = JSON.stringify({ "image": img});

    await fetch('http://localhost:8080/decode', {
        method: 'POST',
        //body: JSON.stringify(codeQR),
        headers: {
            'Content-Type': 'application/json',
            //'Content-Encoding': 'gzip'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => { console.log(data); document.querySelector("#decodificado").innerHTML = `<p>${data.info}<p/>` })
        .catch(error => {console.log("ERROR - ERROR - ERROR - ERROR - ERROR - ERROR - ERROR - ERROR - ERROR"); console.log(error); });
}




// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append(imagenEnvio, fileInput.files[0]);

//     fetch('/decode', {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => {
//             // Handle the response here
//         })
//         .catch(error => {
//             // Handle errors here
//         });
// });
