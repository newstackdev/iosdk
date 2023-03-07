import { FirebaseConfig } from "../types";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfigs: Record<string, FirebaseConfig> = {
  "eu-dev": {
    apiKey: process.env.REACT_APP_DEV_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_DEV_FIREBASE_API_KEY || "",
    projectId: "newlifeio",
    storageBucket: "newlifeio.appspot.com",
    messagingSenderId: process.env.REACT_APP_DEV_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_DEV_FIREBASE_APP_ID || "",
    measurementId: "G-PJWYRPZSNM",
  },
  "eu-sit": {
    apiKey: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    projectId: "newlifeio",
    storageBucket: "newlifeio.appspot.com",
    messagingSenderId: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    appId: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    measurementId: "G-PJWYRPZSNM",
  },
  "eu-prod": {
    apiKey: process.env.REACT_APP_PROD_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_PROD_FIREBASE_API_KEY || "",
    projectId: "newlifeio-prod",
    storageBucket: "newlifeio-prod.appspot.com",
    messagingSenderId: process.env.REACT_APP_PROD_FIREBASE_API_KEY || "",
    appId: process.env.REACT_APP_PROD_FIREBASE_APP_ID || "",
    measurementId: "G-YMT320RGLJ",
  },
  v1: {
    apiKey: process.env.REACT_APP_V1_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_V1_FIREBASE_API_KEY || "",
    projectId: "newlifeio-prod",
    storageBucket: "newlifeio-prod.appspot.com",
    messagingSenderId: process.env.REACT_APP_V1_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_V1_FIREBASE_APP_ID || "",
    measurementId: "G-YMT320RGLJ",
  },
};
