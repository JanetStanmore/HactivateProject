import { auth, db } from "../config/firebase.config";


async function getUserData(userId) {
    const docRef = await db.collection("users").doc(userId).get();
    if(docRef.exists) {
        return docRef.data();
    }
    return null;
}


export default async function signInWithEmail(email, password) {
    const authData = await auth.signInWithEmailAndPassword(email, password);
    window.sessionStorage.setItem("userId", authData.user.uid);
    return getUserData(authData.user.uid);
}