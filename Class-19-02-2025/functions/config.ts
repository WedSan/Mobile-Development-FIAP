import * as admin from "firebase-admin";
import "dotenv"

admin.initializeApp({
    databaseURL: process.env.FIREBASE_DATABASE_URL,
})

export const db = admin.database();

