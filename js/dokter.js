const user = JSON.parse(localStorage.getItem("login"));
if (user.role !== "admin") {
    alert("Akses ditolak!");
    window.location.href = "dashboard.html";
}
const form = document.getElementById("dokterForm");
const tabel = document.getElementById("tabelDokter");
const editIndex = document.getElementById("editIndex");

function getData() {
    return JSON.parse(localStorage.getItem("dokter")) || [];
}

function saveData(data) {
    localStorage.setItem("dokter", JSON.stringify(data));
}

function tampilkanData() {
    const data = getData();
    tabel.innerHTML = "";

    data.forEach((d, i) => {
        tabel.innerHTML += `
            <tr>
                <td>${d.nama}</td>
                <td>${d.spesialis}</td>
                <td>${d.jadwal}</td>
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

    const dokter = {
        nama: nama.value,
        spesialis: spesialis.value,
        jadwal: jadwal.value
    };

    if (editIndex.value === "") {
        data.push(dokter);
    } else {
        data[editIndex.value] = dokter;
        editIndex.value = "";
    }

    saveData(data);
    form.reset();
    tampilkanData();
});

window.editData = index => {
    const data = getData();
    const d = data[index];

    nama.value = d.nama;
    spesialis.value = d.spesialis;
    jadwal.value = d.jadwal;
    editIndex.value = index;
};

window.hapusData = index => {
    if (confirm("Hapus data dokter?")) {
        const data = getData();
        data.splice(index, 1);
        saveData(data);
        tampilkanData();
    }
};

tampilkanData();
