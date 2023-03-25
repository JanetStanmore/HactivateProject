import { auth, db } from "../config/firebase.config";

async function addUserDocument(user) {
  const docRef = db.collection("users").doc(user.uid);
  await docRef.set(user);
  return true;
}

export default function signUpWithEmail(fullName, email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((authData) => {
      if (authData) {
        const userData = {
          name: fullName,
          email: authData?.user?.email,
          userId: authData?.user?.uid,
        };
        addUserDocument(userData);
        window.sessionStorage.setItem("userId", authData?.user.uid);
        return true;
      }
      return false;
    })
    .catch((error) => {
      return false;
    });
}
