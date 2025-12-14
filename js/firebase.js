import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCA8WiR5-98tYff739_2y4ght4_ojn1xNU",
  authDomain: "klinik-web-47757.firebaseapp.com",
  projectId: "klinik-web-47757",
  storageBucket: "klinik-web-47757.firebasestorage.app",
  messagingSenderId: "718953699326",
  appId: "1:718953699326:web:eb08d2cbc4e5012ec6d2af",
  measurementId: "G-Q49DLXX7DB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
