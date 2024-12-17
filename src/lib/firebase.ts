import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC17gWndexNK6-oqEC_yAwmjDmpx-f5Tl0',
  authDomain: 'katarinabluu.firebaseapp.com',
  projectId: 'katarinabluu',
  storageBucket: 'katarinabluu.appspot.com',
  messagingSenderId: '626019077247',
  appId: '1:626019077247:web:0b27fabf8e56267456834a',
  measurementId: 'G-DM4PBSEKZJ',
};
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
