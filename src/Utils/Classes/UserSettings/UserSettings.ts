import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../Firebase/init";

const userSettingsConverter = {
    toFirestore: (userSettings: UserSettings) => {


        return userSettings.toJSON()

    },

    fromFirestore: (snapshot: any, options: any) => {

        const data = snapshot.data(options);



        return new UserSettings(
            data.subscribedTopics
        );
    }
    ,

};

const KEY_COLLECTION = "UserSettings"

export default class UserSettings {
    subscribedTopics: string[]

    toJSON() {
        return {
            subscribedTopics: this.subscribedTopics
        }
    }

    constructor(subscribedTopics: string[]) {
        this.subscribedTopics = subscribedTopics
    }

    save = (user: User) => {



        const ref = doc(firestore, KEY_COLLECTION, user.uid).withConverter(userSettingsConverter)

        return setDoc(ref, this)

    }

    subscribeToTopic = (topic: string) => {

        if (this.subscribedTopics.includes(topic)) {
            return
        }

        this.subscribedTopics.push(topic)
    }

    unsubscribeToTopic = (topic: string) => {
        this.subscribedTopics = this.subscribedTopics.filter(t => t !== topic)
    }

    static getUserSettings = async (user: User): Promise<UserSettings | null> => {

        const ref = doc(firestore, KEY_COLLECTION, user.uid).withConverter(userSettingsConverter)

        const sdata = await getDoc(ref)

        const data = sdata.data()



        if (data) {
            return data
        } else { return null }

    }
}