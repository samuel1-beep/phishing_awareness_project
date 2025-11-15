function bootSequence() {
    const overlay = document.getElementById("bootOverlay");
    const box = document.getElementById("bootText");

    overlay.style.display = "block";

    const lines = [
        "Booting SecureMail...",
        "Loading system modules...",
        "Initializing protections...",
        "Scanning system memory...",
        "Ready."
    ];

    let i = 0;

    const interval = setInterval(() => {
        box.innerHTML += lines[i] + "<br>";
        i++;

        if (i === lines.length) {
            clearInterval(interval);
            setTimeout(() => { overlay.style.display = "none"; }, 1500);
        }
    }, 600);
}

