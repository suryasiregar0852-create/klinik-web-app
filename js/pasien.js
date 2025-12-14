let pasien = [];

document.getElementById("pasienForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let nama = document.getElementById("nama").value;
    let nik = document.getElementById("nik").value;
    let hp = document.getElementById("hp").value;

    pasien.push({ nama, nik, hp });

    tampilkan();
    this.reset();
});

function tampilkan() {
    let list = document.getElementById("listPasien");
    list.innerHTML = "";

    pasien.forEach(p => {
        let li = document.createElement("li");
        li.innerText = `${p.nama} - ${p.nik} - ${p.hp}`;
        list.appendChild(li);
    });
}
