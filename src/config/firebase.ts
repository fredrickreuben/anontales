import { IFirebaseConfig } from "../../types";

const config: IFirebaseConfig = {
    databaseURL: String(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL),
    apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
    appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID) || '',
    measurementId: String(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
};

export default config