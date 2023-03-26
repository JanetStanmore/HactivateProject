import { db } from "../config/firebase.config";

export async function getAllOrders() {
  const collectionQuerySnapshot = await db.collection("orders").get();
  let orders = [];
  collectionQuerySnapshot.forEach((document) => orders.push(document.data()));
  return orders;
}

export async function getAOrder(orderId) {
    try {
      const docRef = await db.collection("orders").doc(orderId).get();
      if (docRef.exists) {
        return docRef.data();
      }
      return null;
    } catch (error) {
      return false;
    }
  }


export async function filterOrdersByUser(userId) {
    try {
        const collectionQuerySnapshot = await db.collection("orders").where("userId", "==", userId).get();
        let orders = [];
        collectionQuerySnapshot.forEach((document) => orders.push(document.data()));
        return orders;
    } catch (error) {
        return false;
    }
}

export async function createAOrder(orderData) {
  try {
    const collectionRef = db.collection("orders");
    await collectionRef.doc(orderData?.orderId).set(orderData);
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateAOrder(orderId, orderData) {
  try {
    const collectionRef = db.collection("orders");
    await collectionRef.doc(orderId).update(orderData);
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteOrder(orderId) {
    try {
       const docRef = await db.collection("orders").doc(orderId);
       await docRef.delete();
       return true;
    } catch (error) {
        return true;
    }
}
