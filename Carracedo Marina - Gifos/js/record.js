var constraints = {
    audio: false,
    video: { width: 384, height: 200, frameRate: 12, }
}

var video = document.querySelector("video");
let recorder = undefined;
let stream = undefined;
let gifURL = undefined;
var time = new Date().getTime();



document.getElementById("comenzar").addEventListener("click", function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            // Inicia Gif RTC Recorder
            recorder = new GifRecorder(stream, constraints);
        })
        .catch(err => {
            console.log(err)
        })
}
);


////////////////////////////////////////        capture           //////////////////////
document.getElementById("capture").addEventListener("click",
    async function startRecording() {
        recorder.record();
        console.log("recording... say Hi!!");
    });

////////////////////////////////////////       listo (stop recording)   //////////////////////

var miURL = undefined;
let myNewBlob = undefined;
document.getElementById("listo").addEventListener("click",
    async function stopRecording(blob) {
        recorder.stop(function (blob) {
            myNewBlob = URL.createObjectURL(blob);

            video.setAttribute("class", "hidden");
            document.getElementById("preview").removeAttribute("class", "hidden");
            document.getElementById("migifo").src = myNewBlob;
            document.getElementById("preview").src = myNewBlob;
            document.getElementById("preview2").src = myNewBlob;

            document.getElementById("repeat").addEventListener("click", function () {
                console.log("...");
                // pisar el guifo grabando otro
            });
            document.getElementById("upload").addEventListener("click", function () {
                // gifURL = localStorage.getItem(time);
                console.log("Guifo retrieved");

                let gifName = "Gif " + time;
                let form = new FormData();
                form.append('file', blob, gifName);

                fetch(GIPHY_UPLOAD_URL + myNewBlob, {
                    method: 'POST',
                    body: form
                })
                    .then(response => response.json())
                    .then(function (response) {
                        console.log("Respuesta ", response);
                        let IdActual = response.data.id;
                        // localStorage.setItem(time, response.data.id);
                        localStorage.setItem(time, IdActual);

                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        var descarga = document.getElementById("descarga")
                        //creo element "a"
                        var elementa = document.createElement('a');
                        //    elementa.setAttribute("href","https://i.giphy.com/media/" + IdActual + "/giphy.mp4"); 
                        elementa.setAttribute("href", myNewBlob);
                        elementa.setAttribute("download", "mi gifo.mp4");
                        descarga.appendChild(elementa);

                        var elementbtn = document.createElement("button");
                        elementbtn.setAttribute("id", "downloadGif");
                        // elementbtn.setAttribute("onclick", "download()");
                        elementa.appendChild(elementbtn);
                        var descargarGuifo = document.createTextNode("Descargar Guifo");
                        elementbtn.appendChild(descargarGuifo);

                        // Inicio download. 
                        // document.getElementById("downloadGif").addEventListener("click", function () {
                        //     var text = document.getElementById("downloadGif").value;
                        //     var filename = "GFG.txt";
                        //     download(filename, text);
                        // }, false);


                        {
                            async function getURL() {
                                const consultaURL = await fetch(GetById + IdActual + completeGetById);
                                const consultaURLJson = await consultaURL.json();
                                console.log(consultaURLJson);
                                return consultaURLJson;
                            }
                            getURL();

                            async function copyURL() {
                                let miURL = await getURL();
                                console.log(miURL);
                                let GifURL = miURL.data.images.original_mp4.mp4;
                                console.log(GifURL);
                                
                                document.getElementById("copyURL").addEventListener("click", function copyURL() {
                                    navigator.clipboard.writeText(GifURL);
                                    alert("guifo copied");
                                }
                                );
                               
                            }
                            copyURL();
                        }

                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    })
                    .catch(function (error) {
                        console.log("no pudimos subir el gifo ", error);
                    });

                // console.log("Guifo retrieved");
                console.log("mi gif subido fue el " + gifName);

                setTimeout(function () {
                    cuadro5.setAttribute("class", "hidden");
                }, 8000)

                setTimeout(function () {
                    cuadro6.setAttribute("class", "cuadro6");
                }, 8000)

                setTimeout(function () {
                    tendencias.removeAttribute("class", "hidden");
                }, 8000)

            });

        });
    });
