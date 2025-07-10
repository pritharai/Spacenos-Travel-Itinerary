import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const addItinerary = async (data) => {
  return await addDoc(collection(db, "itineraries"), data);
};

export const getUserItineraries = async (email) => {
  const q = query(collection(db, "itineraries"), where("userEmail", "==", email));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateItinerary = async (id, newData) => {
  return await updateDoc(doc(db, "itineraries", id), newData);
};

export const deleteItinerary = async (id) => {
  return await deleteDoc(doc(db, "itineraries", id));
};
