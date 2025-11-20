// ==============================
// MATRIX BACKGROUND
// ==============================
startMatrix();

// ==============================
// METRICS (localStorage keys)
// ==============================
const METRICS = {
  clicks: "pa_totalClicks",
  compromised: "pa_compromisedCount",
  safe: "pa_safeCount",
  quizCompletions: "pa_quizCompletions",
  totalTime: "pa_totalTimeSeconds",
};

function incrementMetric(key, amount = 1) {
  const current = parseInt(localStorage.getItem(key) || "0", 10);
  localStorage.setItem(key, current + amount);
}

// ==============================
// TIME ON PAGE TRACKING
// ==============================
let startTime = Date.now();

window.addEventListener("beforeunload", () => {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  incrementMetric(METRICS.totalTime, seconds);
});

// ==============================
// VIRUS OVERLOAD (GLITCH) SIMULATION
// ==============================
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
    "[!] Scanning system integrity...",
    "[!] Malware signatures detected...",
    "[!] Attempting quarantine...",
    "[!] Quarantine failed. Escalating...",
    "[!] Rolling back malicious activity...",
    "[✓] System restored to safe state.",
  ];

  let i = 0;
  let percent = 0;

  const interval = setInterval(() => {
    terminal.innerHTML += lines[i] + "<br>";
    terminal.scrollTop = terminal.scrollHeight;
    i++;

    percent += 100 / lines.length;
    fill.style.width = Math.min(percent, 100) + "%";

    if (i === lines.length) {
      clearInterval(interval);
      setTimeout(() => {
        overlay.style.display = "none";
      }, 2000);
    }
  }, 450);
});

// ==============================
// SYSTEM SCAN ANIMATION
// ==============================
document.getElementById("scanBtn").addEventListener("click", () => {
  const scanOverlay = document.getElementById("scanOverlay");
  const scanLog = document.getElementById("scanLog");
  const scanBar = document.getElementById("scanBar");

  scanOverlay.style.display = "flex";
  scanLog.innerHTML = "";
  scanBar.style.width = "0%";

  const lines = [
    "Initializing secure scan...",
    "Checking network connections...",
    "Scanning system files...",
    "Analyzing running processes...",
    "Evaluating threat indicators...",
    "Threat level rising...",
    "Suspicious script activity detected...",
    "Attempting automated cleanup...",
    "Cleanup completed.",
    "System status: STABLE",
  ];

  let i = 0;
  let percent = 0;

  const interval = setInterval(() => {
    scanLog.innerHTML += lines[i] + "\n";
    scanLog.scrollTop = scanLog.scrollHeight;

    percent += 100 / lines.length;
    scanBar.style.width = Math.min(percent, 100) + "%";

    i++;
    if (i === lines.length) {
      clearInterval(interval);
      setTimeout(() => {
        scanOverlay.style.display = "none";
      }, 2000);
    }
  }, 500);
});

// ==============================
// SYSTEM DESTRUCTION SIMULATION
// ==============================
document.getElementById("badClickBtn").addEventListener("click", () => {
  // Record metrics
  incrementMetric(METRICS.clicks);
  incrementMetric(METRICS.compromised);

  const overlay = document.getElementById("destructionOverlay");
  const txt = document.getElementById("destructionText");
  const alertSound = document.getElementById("alertSound");

  let steps = [
    "ALERT: Malicious link executed...",
    "Corrupting display buffers...",
    "Overwriting system memory...",
    "Network connection hijacked...",
    "Critical failure in 3...",
    "2...",
    "1...",
    "SYSTEM DESTROYED (SIMULATION ONLY)",
  ];

  let i = 0;
  overlay.style.display = "flex";
  document.body.classList.add("shake");

  try {
    alertSound.currentTime = 0;
    alertSound.play();
  } catch (e) {}

  const interval = setInterval(() => {
    txt.textContent = steps[i];
    i++;

    if (i === steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        document.body.classList.remove("shake");
        overlay.style.display = "none";
      }, 2000);
    }
  }, 500);
});

// ==============================
// SAFE CLICK SIMULATION
// ==============================
document.getElementById("safeClickBtn").addEventListener("click", () => {
  incrementMetric(METRICS.clicks);
  incrementMetric(METRICS.safe);

  Swal.fire({
    title: "✅ Safe Choice",
    text: "You chose to ignore a suspicious link — excellent!",
    icon: "success",
    background: "#111",
    color: "#fff",
    confirmButtonColor: "#0ac5a8",
  });
});

// ==============================
// ADVANCED QUIZ (with explanations + results table)
// ==============================
let lastScore = 0;

document.getElementById("submitQuiz").addEventListener("click", () => {
  const answers = {
    q1: "urgent",
    q2: "verify_official",
    q3: "check_url",
  };

  const explanations = {
    q1: {
      question: "Which of the following is a common phishing red flag?",
      correct: "The email creates urgency or fear to get you to act quickly",
      explanation:
        "Urgency is used by attackers to force quick decisions without thinking.",
    },
    q2: {
      question:
        "You receive a suspicious password email. What should you do?",
      correct:
        "Ignore the link and check the official school website or app directly",
      explanation:
        "Always navigate directly to official websites. Attackers use fake domains.",
    },
    q3: {
      question:
        "What is the best first step when a login page looks real, but the URL looks suspicious?",
      correct: "Check the full URL to confirm it belongs to the official domain",
      explanation:
        "Logos can be faked — URLs reveal the true origin of the site.",
    },
  };

  let score = 0;
  let resultsHTML = `
    <table style="width:100%; margin-top:20px; border-collapse: collapse; color: #e4faff;">
      <tr style="border-bottom:1px solid #0ac5a8;">
        <th style="padding:8px;">Question</th>
        <th style="padding:8px;">Correct Answer</th>
        <th style="padding:8px;">Explanation</th>
      </tr>
  `;

  for (let q = 1; q <= 3; q++) {
    const selected = document.querySelector(`input[name='q${q}']:checked`);
    const key = "q" + q;

    if (selected && selected.value === answers[key]) {
      score++;
    }

    resultsHTML += `
      <tr style="border-bottom:1px solid #0ac5a8;">
        <td style="padding:8px;">${explanations[key].question}</td>
        <td style="padding:8px;">${explanations[key].correct}</td>
        <td style="padding:8px;">${explanations[key].explanation}</td>
      </tr>
    `;
  }

  resultsHTML += "</table>";

  document.getElementById("quizResultsTable").innerHTML = resultsHTML;

  lastScore = score;

  document.getElementById("quizScore").innerText = `You scored ${score}/3`;

  if (score >= 2) {
    document.getElementById("certBtn").disabled = false;
    incrementMetric(METRICS.quizCompletions);
  }

  Swal.fire({
    title: "Quiz Completed!",
    html: `Your score: <strong>${score}/3</strong><br>Scroll down for detailed explanations.`,
    icon: score === 3 ? "success" : "info",
    background: "#111",
    color: "#fff",
    confirmButtonColor: "#0ac5a8",
  });
});

// ==============================
// CERTIFICATE GENERATOR
// ==============================
document.getElementById("certBtn").addEventListener("click", async () => {
  if (lastScore < 2) return;

  const { value: name } = await Swal.fire({
    title: "Enter your name for the certificate",
    input: "text",
    background: "#111",
    color: "#fff",
    confirmButtonColor: "#0ac5a8",
    showCancelButton: true,
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
  doc.text("This certifies that:", 105, 45, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(name, 105, 55, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("has successfully completed the advanced phishing", 105, 70, { align: "center" });
  doc.text("awareness simulation and quiz.", 105, 78, { align: "center" });

  doc.text(`Score: ${lastScore}/3`, 105, 90, { align: "center" });

  const date = new Date().toLocaleDateString();
  doc.text(`Date: ${date}`, 25, 110);

  doc.save("Phishing_Awareness_Certificate.pdf");
});
