const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "petugas", password: "petugas123", role: "petugas" }
];

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const u = username.value;
    const p = password.value;

    const user = users.find(x => x.username === u && x.password === p);

    if (user) {
        localStorage.setItem("login", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText =
            "Username atau password salah!";
    }
});

// PROTEKSI HALAMAN
const loginData = JSON.parse(localStorage.getItem("login"));
const halamanLogin = window.location.pathname.includes("index.html");

if (!loginData && !halamanLogin) {
    window.location.href = "index.html";
}

// LOGOUT
function logout() {
    localStorage.removeItem("login");
    window.location.href = "index.html";
}

// HAK AKSES MENU
document.addEventListener("DOMContentLoaded", () => {
    if (!loginData) return;

    if (loginData.role === "petugas") {
        document.querySelectorAll(".admin-only").forEach(el => {
            el.style.display = "none";
        });
    }
});
