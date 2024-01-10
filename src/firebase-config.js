import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDCsVwDIzp4adfHJ7kueAZ2IfFMFKOUCOs",
    authDomain: "hospital-managament-242cd.firebaseapp.com",
    projectId: "hospital-managament-242cd",
    storageBucket: "hospital-managament-242cd.appspot.com",
    messagingSenderId: "484936593043",
    appId: "1:484936593043:web:b793632be4e1094ea12766",
    measurementId: "G-GTEXGEKNEC"
  };

  const app = initializeApp(firebaseConfig)
  
  export const auth = getAuth(app)
