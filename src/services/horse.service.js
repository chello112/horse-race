import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const horseCollectionRef = collection(db, "horses");
class HorseDataService {
  addHorse = (newHorse) => {
    return addDoc(horseCollectionRef, newHorse);
  };

  updateHorse = (id, updatedHorse) => {
    const horseDoc = doc(db, "horses", id);
    return updateDoc(horseDoc, updatedHorse);
  };

  deleteHorse = (id) => {
    const horseDoc = doc(db, "horses", id);
    return deleteDoc(horseDoc);
  };

  getAllHorses = () => {
    return getDocs(horseCollectionRef);
  };

  getHorse = (id) => {
    const horseDoc = doc(db, "horses", id);
    return getDoc(horseDoc);
  };
}

export default new HorseDataService();
