const scanBtn = document.getElementById("scanBtn");
const scanLine = document.getElementById("scanLine");

const loadingPopup = document.getElementById("loadingPopup");
const resultPopup = document.getElementById("resultPopup");

let html5QrCode = null;
let isScanning = false;

// =========================
// КНОПКА "СКАНУВАТИ"
// =========================
scanBtn.addEventListener("click", () => {
    if (isScanning) return;

    isScanning = true;
    startLine();
    startScanner();
});

// =========================
// АНІМАЦІЯ ЛІНІЇ
// =========================
function startLine() {
    scanLine.style.opacity = "1";
    scanLine.style.animation = "scan 2s linear infinite";
}

function stopLine() {
    scanLine.style.opacity = "0";
    scanLine.style.animation = "none";
}

// =========================
// QR СКАНЕР
// =========================
function startScanner() {
    html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            onQrFound(decodedText);
        },
        () => {}
    );
}

// =========================
// КОЛИ QR ЗНАЙДЕНО
// =========================
function onQrFound(result) {
    if (!isScanning) return;
    isScanning = false;

    // 1️⃣ Зупиняємо лінію
    stopLine();

    // 2️⃣ ПОКАЗУЄМО LOADER
    loadingPopup.classList.remove("hidden");

    // 3️⃣ ДАЄМО БРАУЗЕРУ ВІДМАЛЮВАТИ UI
    requestAnimationFrame(() => {

        // 4️⃣ ІМІТАЦІЯ ЗАВАНТАЖЕННЯ
        setTimeout(async () => {

            // 5️⃣ ТІЛЬКИ ТЕПЕР ЗУПИНЯЄМО КАМЕРУ
            try {
                if (html5QrCode) {
                    await html5QrCode.stop();
                    html5QrCode.clear();
                }
            } catch (e) {
                console.warn("Camera stop error", e);
            }

            // 6️⃣ ПЕРЕХІД ДО РЕЗУЛЬТАТУ
            loadingPopup.classList.add("hidden");
            resultPopup.classList.remove("hidden");

            console.log("QR результат:", result);

        }, 3000);

    });
}

// =========================
// КНОПКИ POPUP
// =========================
document.getElementById("continueBtn").onclick = () => {
    resultPopup.classList.add("hidden");
};

document.getElementById("listBtn").onclick = () => {
    alert("Сторінка списку буде реалізована окремо");
};

// =========================
// KEYFRAMES ДЛЯ ЛІНІЇ
// =========================
const style = document.createElement("style");
style.innerHTML = `
@keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
}
`;
document.head.appendChild(style);
