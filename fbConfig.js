import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "urlshortyy.firebaseapp.com",
  projectId: "urlshortyy",
  storageBucket: "urlshortyy.appspot.com",
  messagingSenderId: "213079272990",
  appId: "1:213079272990:web:f828a25ecc86834764480f",
  measurementId: "G-HRCPCHM98W"
};

export const fbApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);