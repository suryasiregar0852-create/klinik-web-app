import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const pasienRef = collection(db, "pasien");
const list = document.getElementById("listPasien");

async function loadPasien() {
  list.innerHTML = "";
  const snapshot = await getDocs(pasienRef);

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    const li = document.createElement("li");
    li.innerHTML = `
      ${data.nama} - ${data.nik} - ${data.hp}
      <button onclick="hapus('${docSnap.id}')">Hapus</button>
    `;
    list.appendChild(li);
  });
}

window.hapus = async (id) => {
  await deleteDoc(doc(db, "pasien", id));
  loadPasien();
};

document.getElementById("pasienForm").addEventListener("submit", async e => {
  e.preventDefault();

  await addDoc(pasienRef, {
    nama: nama.value,
    nik: nik.value,
    hp: hp.value
  });

  e.target.reset();
  loadPasien();
});

loadPasien();
