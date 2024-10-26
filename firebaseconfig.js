import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, deleteField, deleteDoc, doc, getDocs } from "firebase/firestore";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

initializeApp(firebaseConfig);
const firestore = getFirestore();
const ITEMS = 'items';

export { firestore, collection, addDoc, serverTimestamp , ITEMS, deleteField, deleteDoc, doc, getDocs };
//kova säätö saada toimimaan jonku takii...