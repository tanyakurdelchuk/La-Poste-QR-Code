ivconst scanBtn = document.getElementById("scanBtn");
const scanLine = document.getElementById("scanLine");
const popup = document.getElementById("popup");

let scanning = false;
let html5QrCode;

// Кнопка “Сканувати”
scanBtn.addEventListener("click", async () => {
    if (scanning) return;
    scanning = true;

    startAnimation();
    await startQr();
});

// Анімація лінії
function startAnimation() {
    scanLine.style.opacity = 1;
    scanLine.style.animation = "scan 10s linear";
}

function stopAnimation() {
    scanLine.style.opacity = 0;
    scanLine.style.animation = "none";
}

// Реальне сканування QR
async function startQr() {
    html5QrCode = new Html5Qrcode("reader");

    await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            finishScan(decodedText);
        }
    );

    // Фіктивний 10-секундний таймаут для “повільного сканування”
    setTimeout(() => {
        if (scanning) {
            finishScan("adress1"); // тестовий ID
        }
    }, 10000);
}

function finishScan(result) {
    scanning = false;
    html5QrCode.stop().catch(() => {});
    stopAnimation();

    console.log("Зчитано:", result);
    popup.classList.remove("hidden");

    addToList(result);
}

// Додаємо до списку (JSON)
async function addToList(id) {
    const res = await fetch("delivery.json");
    const data = await res.json();
    const found = data.find(item => item.id === id);
    console.log("Пакунок:", found);
}

// Popup кнопки
document.getElementById("continueBtn").onclick = () => {
    popup.classList.add("hidden");
};

document.getElementById("listBtn").onclick = () => {
    alert("Сторінка списку ще не готова");
};

// Анімація лінії
const style = document.createElement("style");
style.innerHTML = `
@keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
}`;
document.head.appendChild(style);
