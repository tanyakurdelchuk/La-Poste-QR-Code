const scanBtn = document.getElementById("scanBtn");
const scanLine = document.getElementById("scanLine");
const popup = document.getElementById("popup");

let html5QrCode;
let scanning = false;

// Start scanning on button click
scanBtn.addEventListener("click", () => {
    if (scanning) return;

    scanning = true;
    startAnimation();
    startQr();
});

function startAnimation() {
    scanLine.style.opacity = 1;
    scanLine.style.animation = "scan 10s linear";
}

function stopAnimation() {
    scanLine.style.opacity = 0;
    scanLine.style.animation = "none";
}

function startQr() {
    html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            console.log("QR:", decodedText);
            finishScan(decodedText);
        }
    );

    // force slow scan (10s)
    setTimeout(() => {
        if (scanning) {
            finishScan("address1"); // тест
        }
    }, 10000);
}

function finishScan(result) {
    scanning = false;

    html5QrCode.stop().catch(() => {});
    stopAnimation();

    console.log("Результат:", result);
    popup.classList.remove("hidden");

    addToList(result);
}

// JSON logic
async function addToList(id) {
    const res = await fetch("data.json");
    const data = await res.json();

    const found = data.find(item => item.id === id);
    console.log("Пакунок:", found);
}

// Popup buttons
document.getElementById("continueBtn").onclick = () => {
    popup.classList.add("hidden");
};

document.getElementById("listBtn").onclick = () => {
    alert("Тут буде сторінка списку");
};

// Animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
}`;
document.head.appendChild(style);
