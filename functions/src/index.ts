import * as functions from "firebase-functions";
import * as admin from "firebase-admin"


export const subscribeToTopic = functions.https.onCall(async (data, context) => {



    await admin.messaging().subscribeToTopic(data.token, data.topic)


    return `Subscribed to ${data.topic}`
})

export const unsubscribeFromTopic = functions.https.onCall(async (data, context) => {

    await admin.messaging().unsubscribeFromTopic(data.token, data.topic)


    return `Unsubscribed to ${data.topic}`
})


admin.initializeApp()


export const newEvento = functions.firestore
    .document('Eventi/{docId}')
    .onCreate((change, context) => {

        const message: admin.messaging.Notification = {
            body: `${change.data().descrizione}`,
            title: `Nuovo evento ${change.data().nome}`
        }

        const payload: admin.messaging.Message = {
            notification: message,
            topic: "new_event"
        }

        // console.log(change.data())

        console.log("Evento creato")
        return admin.messaging().send(payload)


    });
