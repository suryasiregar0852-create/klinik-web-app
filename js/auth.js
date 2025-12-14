document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "admin123") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Login gagal!";
    }
});
