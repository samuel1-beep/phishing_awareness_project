// TYPEWRITER
const text = "Initializing SecureMail scanner... awaiting user input...";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    }
}
typeWriter();

// LOGIN EVENT
document.getElementById("phishForm").addEventListener("submit", function(e){
    e.preventDefault();

    document.body.classList.add("glitch");
    setTimeout(() => document.body.classList.remove("glitch"), 1500);

    Swal.fire({
        title: "⚠ You've Been Phished!",
        text: "This was a simulated attack — let's learn more.",
        icon: "warning",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0ac5a8"
    }).then(()=>window.location.href="awareness.html");

    fetch("https://api.countapi.xyz/hit/securemail/training");
});

