const video = document.getElementById("video");
const scanBtn = document.getElementById("scanBtn");
const scanLine = document.getElementById("scanLine");
const popup = document.getElementById("popup");

// Камера
navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
})
.then(stream => {
    video.srcObject = stream;
})
.catch(err => {
    alert("Не вдалося отримати доступ до камери");
});

// Кнопка сканування
scanBtn.addEventListener("click", () => {
    startScan();
});

function startScan() {
    scanLine.style.opacity = 1;
    scanLine.style.animation = "scan 10s linear";

    // Імітація повільного сканування (10 сек)
    setTimeout(() => {
        scanLine.style.opacity = 0;
        scanLine.style.animation = "none";
        popup.classList.remove("hidden");

        // ТУТ буде реальне зчитування QR
        // result = "adress1"

        const scannedId = "adress1";
        addToList(scannedId);

    }, 10000);
}

// Анімація
const style = document.createElement("style");
style.innerHTML = `
@keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
}
`;
document.head.appendChild(style);

// Робота з JSON
async function addToList(id) {
    const res = await fetch("data.json");
    const data = await res.json();

    const found = data.find(item => item.id === id);
    console.log("Знайдено пакунок:", found);
}

// Кнопки popup
document.getElementById("continueBtn").onclick = () => {
    popup.classList.add("hidden");
};

document.getElementById("listBtn").onclick = () => {
    alert("Перехід до сторінки списку");
};
