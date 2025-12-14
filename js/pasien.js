import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const pasienRef = collection(db, "pasien");
const tabel = document.getElementById("tabelPasien");
const form = document.getElementById("pasienForm");

let editId = null;

// LOAD DATA
async function loadPasien() {
  tabel.innerHTML = "";
  const snapshot = await getDocs(pasienRef);

  snapshot.forEach(d => {
    const p = d.data();
    tabel.innerHTML += `
      <tr>
        <td>${p.nama}</td>
        <td>${p.nik}</td>
        <td>${p.hp}</td>
        <td>
          <button onclick="editPasien('${d.id}','${p.nama}','${p.nik}','${p.hp}')">Edit</button>
          <button onclick="hapusPasien('${d.id}')">Hapus</button>
        </td>
      </tr>
    `;
  });
}

// TAMBAH / UPDATE
form.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    nama: nama.value,
    nik: nik.value,
    hp: hp.value
  };

  if (editId === null) {
    await addDoc(pasienRef, data);
  } else {
    await updateDoc(doc(db, "pasien", editId), data);
    editId = null;
  }

  form.reset();
  loadPasien();
});

// EDIT
window.editPasien = (id, namaP, nikP, hpP) => {
  editId = id;
  nama.value = namaP;
  nik.value = nikP;
  hp.value = hpP;
};

// DELETE
window.hapusPasien = async id => {
  if (confirm("Hapus data pasien?")) {
    await deleteDoc(doc(db, "pasien", id));
    loadPasien();
  }
};

loadPasien();
