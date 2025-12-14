const form = document.getElementById("pelayananForm");
const tabel = document.getElementById("tabelPelayanan");
const editIndex = document.getElementById("editIndex");
const pasienSelect = document.getElementById("pasien");
const dokterSelect = document.getElementById("dokter");

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// LOAD PASIEN & DOKTER KE SELECT
function loadSelect() {
    const pasien = getData("pasien");
    const dokter = getData("dokter");

    pasienSelect.innerHTML = `<option value="">Pilih Pasien</option>`;
    dokterSelect.innerHTML = `<option value="">Pilih Dokter</option>`;

    pasien.forEach(p => {
        pasienSelect.innerHTML += `<option value="${p.nama}">${p.nama}</option>`;
    });

    dokter.forEach(d => {
        dokterSelect.innerHTML += `<option value="${d.nama}">${d.nama}</option>`;
    });
}

// TAMPILKAN DATA PELAYANAN
function tampilkanData() {
    const data = getData("pelayanan");
    tabel.innerHTML = "";

    data.forEach((p, i) => {
        tabel.innerHTML += `
            <tr>
                <td>${p.tanggal}</td>
                <td>${p.pasien}</td>
                <td>${p.dokter}</td>
                <td>${p.keluhan}</td>
                <td>${p.diagnosa}</td>
                <td>${p.tindakan}</td>
                <td>
                    <button onclick="editData(${i})">Edit</button>
                    <button onclick="hapusData(${i})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// SIMPAN / UPDATE
form.addEventListener("submit", e => {
    e.preventDefault();
    const data = getData("pelayanan");

    const pelayanan = {
        pasien: pasien.value,
        dokter: dokter.value,
        tanggal: tanggal.value,
        keluhan: keluhan.value,
        diagnosa: diagnosa.value,
        tindakan: tindakan.value
    };

    if (editIndex.value === "") {
        data.push(pelayanan);
    } else {
        data[editIndex.value] = pelayanan;
        editIndex.value = "";
    }

    saveData("pelayanan", data);
    form.reset();
    tampilkanData();
});

// EDIT
window.editData = index => {
    const data = getData("pelayanan");
    const p = data[index];

    pasien.value = p.pasien;
    dokter.value = p.dokter;
    tanggal.value = p.tanggal;
    keluhan.value = p.keluhan;
    diagnosa.value = p.diagnosa;
    tindakan.value = p.tindakan;
    editIndex.value = index;
};

// HAPUS
window.hapusData = index => {
    if (confirm("Hapus data pelayanan?")) {
        const data = getData("pelayanan");
        data.splice(index, 1);
        saveData("pelayanan", data);
        tampilkanData();
    }
};

loadSelect();
tampilkanData();
