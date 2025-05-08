import axios from 'axios';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
export async function getSearchedGames(query: string) {
 const url = `${API_URL}/games?key=${API_KEY}&search=${query}`;
 const { data } = await axios.get(url);
 return data.results;
}
export async function getGameDetails(slug: string) {
    const url = `${API_URL}/games/${slug}?key=${API_KEY}`;
    const { data } = await axios.get(url);
    return data;
   }
   const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
   const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
   const auth = getAuth(app);
   
   export { auth };
   export const db = getFirestore(app);
