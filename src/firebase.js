import firebase from 'firebase';

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyDk4ryphwB_ylbhgXXe2rsZGV3YvDAJLvI',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'http://oscapp2020.firebaseapp.com/',
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    'https://oscapp2020.firebaseio.com/',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'oscapp2020',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'http://oscapp2020.appspot.com/',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1043592813005',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:1043592813005:web:714e0188f707de6b924c84',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-MGM0M1KZKP',
  accessKey:
    process.env.NEXT_PUBLIC_SECURE_TOKEN_ACCESS_KEY ||
    'af17aa374d12cb43e83faa1c4b4d29b89cfef929cfa5b36ee77e67ccf796cccda5357283ba2cdfc3884fbf6f60ee15ea6fef2f43cb2e028447d809dfeaf64e5823054ce35b362508bf9184e7a52068e36cb6a5c77fad255a99eb4d47a86ebc13b272ad365ee238462f84c39f681e019e23adc0dde9e9277b66c92580103b1c00303e9477ef4164f74d4b762cef5b5394ec3bc4fe8dd483adce3c33015f71b097b544d021033a7992def7af6c80c7241edb07aaa4262625780da9ccca8ff531116fbc9c31f09e7320fe86b23e424bcf7ebdb2dbb2bdcc884e12786f06438e1c4a219ad50462b59d21d82432b435eb590117fea6ac46ab7f7925b1d939ae39158a'
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase initialization error', err.stack);
  }
}

export const db = firebase.firestore();
export default firebase;
