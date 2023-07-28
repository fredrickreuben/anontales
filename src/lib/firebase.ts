
import { FirebaseApp, initializeApp } from "firebase/app";
import { CollectionReference, Firestore, collection, getFirestore } from "firebase/firestore";

import config from "@anontales/config/firebase";


export default class FirebaseInstance {

    private static instance: FirebaseInstance | null = null;
    private app: FirebaseApp;
    private database: Firestore

    private constructor() {
        this.app = initializeApp(config)
        this.database = getFirestore(this.app)
    }

    public static getInstance(): FirebaseInstance {
        if (!FirebaseInstance.instance) {
            FirebaseInstance.instance = new FirebaseInstance();
        }
        return FirebaseInstance.instance;
    }

    public getDatabase(): Firestore {
        return this.database
    }

    public getRefrence(path: string): CollectionReference {
        return collection(this.database, path)
    }
}