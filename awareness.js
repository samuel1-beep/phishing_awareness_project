// ================= MATRIX BACKGROUND ===============
startMatrix();

// ================= VIRUS OVERLOAD =================
document.getElementById("glitchBtn").addEventListener("click", () => {

    const overlay = document.getElementById("virusOverlay");
    const terminal = document.getElementById("terminalOutput");
    const fill = document.getElementById("integrityFill");

    overlay.style.display = "block";
    terminal.innerHTML = "";
    fill.style.width = "0%";

    const lines = [
        "[!] Unauthorized access detected...",
        "[!] Deploying countermeasures...",
        "[!] Scanning system...",
        "[!] Malware signature detected...",
        "[!] Attempting quarantine...",
        "[!] ERROR: Quarantine failed",
        "[!] System integrity dropping...",
        "[!] System overload imminent...",
        "[✓] Restoring system...",
        "[✓] Security restored"
    ];

    let i = 0;
    let percent = 0;

    const interval = setInterval(() => {
        terminal.innerHTML += lines[i] + "<br>";
        terminal.scrollTop = terminal.scrollHeight;
        i++;

        percent += 10;
        fill.style.width = percent + "%";

        if (i === lines.length) {
            clearInterval(interval);
            setTimeout(()=> overlay.style.display="none", 2000);
        }
    }, 400);
});

// ================= QUIZ + CERTIFICATE ===============
let lastScore = 0;

document.getElementById("submitQuiz").addEventListener("click", () => {

    let score = 0;

    for (let q=1; q<=3; q++) {
        const selected = document.querySelector(`input[name='q${q}']:checked`);
        if (selected && selected.value === "1") {
            score++;
        }
    }

    lastScore = score;

    if (score >= 2) {
        document.getElementById("certBtn").disabled = false;
    }

    Swal.fire({
        title: "Quiz Completed!",
        text: `Your Score: ${score}/3`,
        icon: score === 3 ? "success" : "info",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0ac5a8"
    });

    document.getElementById("quizScore").innerText = `You scored ${score}/3`;
});

// ================= PDF CERTIFICATE =================
document.getElementById("certBtn").addEventListener("click", async () => {

    if (lastScore < 2) return;

    const { value: name } = await Swal.fire({
        title: "Enter your name",
        input: "text",
        background: "#111",
        color: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#0ac5a8",
    });

    if (!name) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setDrawColor(0, 255, 204);
    doc.setLineWidth(1.2);
    doc.rect(10, 10, 190, 130);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Phishing Awareness Training Certificate", 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("This certifies that:", 105, 45, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(name, 105, 55, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`has successfully completed the SecureMail`, 105, 70, { align: "center" });
    doc.text(`phishing awareness simulation`, 105, 78, { align: "center" });
    doc.text(`with a score of ${lastScore}/3.`, 105, 86, { align: "center" });

    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 25, 105);

    doc.text("Instructor Signature: __________________", 25, 115);

    doc.save("Phishing_Awareness_Certificate.pdf");
});
