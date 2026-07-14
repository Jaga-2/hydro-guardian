import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCCWttl2pZjK60oPIQ2q58vtxP2HcMEexo',
  authDomain: 'aqua-60b55.firebaseapp.com',
  projectId: 'aqua-60b55',
  storageBucket: 'aqua-60b55.firebasestorage.app',
  messagingSenderId: '364957947395',
  appId: '1:364957947395:web:188cadbd2cf6922fec6036',
  measurementId: 'G-W9B5E3T6BC'

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
