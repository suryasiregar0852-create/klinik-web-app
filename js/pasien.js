const form = document.getElementById("pasienForm");
const tabel = document.getElementById("tabelPasien");
const editIndex = document.getElementById("editIndex");

function getData() {
    return JSON.parse(localStorage.getItem("pasien")) || [];
}

function saveData(data) {
    localStorage.setItem("pasien", JSON.stringify(data));
}

function tampilkanData() {
    const data = getData();
    tabel.innerHTML = "";

    data.forEach((p, i) => {
        tabel.innerHTML += `
            <tr>
                <td>${p.nama}</td>
                <td>${p.nik}</td>
                <td>${p.hp}</td>
                <td>
                    <button onclick="editData(${i})">Edit</button>
                    <button onclick="hapusData(${i})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = getData();

    const pasien = {
        nama: nama.value,
        nik: nik.value,
        hp: hp.value
    };

    if (editIndex.value === "") {
        data.push(pasien);
    } else {
        data[editIndex.value] = pasien;
        editIndex.value = "";
    }

    saveData(data);
    form.reset();
    tampilkanData();
});

window.editData = index => {
    const data = getData();
    const p = data[index];

    nama.value = p.nama;
    nik.value = p.nik;
    hp.value = p.hp;
    editIndex.value = index;
};

window.hapusData = index => {
    if (confirm("Hapus data pasien?")) {
        const data = getData();
        data.splice(index, 1);
        saveData(data);
        tampilkanData();
    }
};

tampilkanData();
