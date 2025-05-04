import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const saveTokenSet = async ({ slackToken, appToken, discordToken }) => {
    const user = auth.currentUser;
    if (!user) {
        alert("ログインしていません");
        return;
    }

    const docRef = doc(db, "tokens", user.uid);
    const data = {
        email: user.email,
        updatedAt: new Date(),
        slackToken: slackToken || null,
        appToken: appToken || null,
        discordToken: discordToken || null
    };

    try {
        await setDoc(docRef, data, { merge: true });
    } catch (error) {
        console.error("Failed to save : ", error);
    }
};
