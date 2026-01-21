const scanBtn = document.getElementById("scanBtn");
const scanLine = document.getElementById("scanLine");
const popup = document.getElementById("popup");

let scanning = false;
let html5QrCode;
let lastResult = null; // тут зберігатимемо останній QR
let scanTimeout;

// Кнопка “Сканувати”
scanBtn.addEventListener("click", async () => {
    if (scanning) return;
    scanning = true;
    lastResult = null;

    startAnimation();
    await startQr();

    // 10 секунд “повільного” сканування
    scanTimeout = setTimeout(() => {
        finishScan(lastResult || "adress1"); // якщо нічого не зчиталось — тестовий ID
    }, 10000);
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
            // зберігаємо останній знайдений QR, не викликаємо finishScan відразу
            lastResult = decodedText;
            console.log("QR зафіксовано, чекаємо таймер:", decodedText);
        }
    );
}

// Завершення сканування після таймера
function finishScan(result) {
    if (!scanning) return;
    scanning = false;
    clearTimeout(scanTimeout);

    html5QrCode.stop().catch(() => {});
    stopAnimation();

    console.log("Сканування завершено, результат:", result);
    popup.classList.remove("hidden");

    addToList(result);
}

// JSON логіка
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
