console.log("Запуск тесту камери");

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
.then(stream => {
    console.log("Камера увімкнена");
    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.srcObject = stream;
    video.style.width = "300px";
    video.style.height = "300px";
    document.body.appendChild(video);
})
.catch(err => {
    console.error("Помилка камери:", err);
    alert(err.name + ": " + err.message);
});
