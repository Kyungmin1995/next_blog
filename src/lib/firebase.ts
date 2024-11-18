// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_BASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIRE_BASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRE_BASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_BASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_BASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIRE_BASE_APPID,
};

// Firebase 앱 초기화 (중복 초기화 방지)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app); // Firestore 인스턴스
const auth = getAuth(app); // Firebase Auth 인스턴스
const storage = getStorage(app); // Firebase Auth 인스턴스

export { app, db, auth, storage };
