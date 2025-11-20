function startMatrix() {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0ac5a8";
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, index) => {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, index * fontSize, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.95) drops[index] = 0;
            drops[index]++;
        });
    }

    setInterval(draw, 33);
}

