// src/lib/getData.js
import firebase_app from './auth';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  listCollections,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

export async function getDocument(collectionName, id) {
  try {
    const docRef = doc(db, collectionName, id);
    console.log('Document reference:', docRef);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { result: docSnap.data(), error: null };
    } else {
      console.error('No such document!');
      return { result: null, error: 'No such document' };
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return { result: null, error };
  }
}

export async function getDocuments(collectionName) {
  try {
    const colRef = collection(db, collectionName);
    console.log('Collection reference:', colRef);
    const querySnapshot = await getDocs(colRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Fetched documents:', documents);
    return { result: documents, error: null };
  } catch (error) {
    console.error('Error getting documents:', error);
    return { result: null, error };
  }
}

export async function listAllCollections() {
  try {
    const colRefs = await listCollections(db);
    const collectionNames = colRefs.map((colRef) => colRef.id);
    console.log('Available collections:', collectionNames);
    return { result: collectionNames, error: null };
  } catch (error) {
    console.error('Error listing collections:', error);
    return { result: null, error };
  }
}

export async function setDocument(collectionName, id, data) {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: true });
    console.log('Document successfully written!');
    return { error: null };
  } catch (error) {
    console.error('Error writing document:', error);
    return { error };
  }
}

export async function deleteDocument(collectionName, id) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log('Document successfully deleted!');
    return { error: null };
  } catch (error) {
    console.error('Error deleting document:', error);
    return { error };
  }
}
