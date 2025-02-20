import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
import { db } from "./config";
import { DataSnapshot } from "firebase-functions/database";

export const createAppointment = functions.https.onRequest(async (req, res) => {
    const { patientId, doctorId, date, specialty, notes } = req.body;

    try {
        const ref = db.ref("appointments").push();
        await ref.set({
         patientId,
         doctorId,
         date,
         specialty,
         status: "pending",
         notes,
         createdAt: admin.database.ServerValue.TIMESTAMP,
        })
        res.status(201).json({ id: ref.key });
    } catch(err){
        res.status(400).json({error: (err as Error).message});
    }
});

export const getAppointments = functions.https.onRequest(async (req, res)=>{
    try {
        const snapshot = await db.ref("appointments").once("value");
        res.status(200).json({ appointments: snapshot.val() });
    } catch(err){
        res.status(400).json({ error: (err as Error).message });
    }
});