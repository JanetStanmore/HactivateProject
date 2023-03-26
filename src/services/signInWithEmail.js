import { auth, db } from "../config/firebase.config";


export async function getUserData(userId) {
    
    const docRef = await db.collection("users").doc(userId).get();
    
    if(docRef.exists) {
        return docRef.data();
    }
    return null;
}

function getRefinedFirebaseAuthErrorMessage(error) {
    return error
      .replace('Firebase: ', '')
      .replace(/\(auth.*\)\.?/, '');
  }


export default async function signInWithEmail(email, password) {
    try {
       const authData = await auth.signInWithEmailAndPassword(email, password);
       window.sessionStorage.setItem("userId", authData.user.uid);
       const userData = await getUserData(authData.user.uid);
       
       window.sessionStorage.setItem("isSecurity", userData?.isSecurity || false); 
       return {
        isSuccessful: true,
        message: "Sign in successful",
        data: userData
       }
    } catch (error) {
        console.log(error.message)
       const errorMesssage = getRefinedFirebaseAuthErrorMessage(error.message);
        return {
            isSuccessful: false,
            message: errorMesssage,
            data: null
        }
    }
    
}