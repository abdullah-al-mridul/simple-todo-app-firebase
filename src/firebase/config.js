import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCZf-kSo82QRN4pay4KwzrGzq2QAYoSNTs",
  authDomain: "todo-app-355a1.firebaseapp.com",
  databaseURL: "https://todo-app-355a1-default-rtdb.firebaseio.com",
  projectId: "todo-app-355a1",
  storageBucket: "todo-app-355a1.appspot.com",
  messagingSenderId: "67332017781",
  appId: "1:67332017781:web:22a4e6d79b5328383e323c",
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
