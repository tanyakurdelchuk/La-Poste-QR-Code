const scanBtn = document.getElementById("scanBtn");
const scanLine = document.getElementById("scanLine");

const loadingPopup = document.getElementById("loadingPopup");
const resultPopup = document.getElementById("resultPopup");

let html5QrCode;
let isScanning = false;

// Кнопка
scanBtn.addEventListener("click", () => {
    if (isScanning) return;
    isScanning = true;
    startScanner();
    startLine();
});

// Лінія
function startLine() {
    scanLine.style.opacity = "1";
    scanLine.style.animation = "scan 2s linear infinite";
}

function stopLine() {
    scanLine.style.opacity = "0";
    scanLine.style.animation = "none";
}

// QR
function startScanner() {
    html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (text) => {
            onQrFound(text);
        }
    );
}

// QR знайдено
function onQrFound(result) {
    if (!isScanning) return;
    isScanning = false;

    stopLine();
    html5QrCode.stop().catch(() => {});

    // ✅ ПОКАЗУЄМО LOADING
    loadingPopup.classList.remove("hidden");

    // ⏳ ІМІТАЦІЯ ЗАВАНТАЖЕННЯ
    setTimeout(() => {
        loadingPopup.classList.add("hidden");
        resultPopup.classList.remove("hidden");
        console.log("QR:", result);
    }, 3000);
}

// Кнопки
document.getElementById("continueBtn").onclick = () => {
    resultPopup.classList.add("hidden");
};

document.getElementById("listBtn").onclick = () => {
    alert("Список буде реалізовано пізніше");
};

// Анімація лінії
const style = document.createElement("style");
style.innerHTML = `
@keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
}`;
document.head.appendChild(style);
