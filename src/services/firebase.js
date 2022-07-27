// Returns an instance of Firebase App, allows application to use config 
// and auth across firebase services.
import { initializeApp } from "firebase/app";


// adding imports for auth functionality 
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

// adding import for firestore to store messages.
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  QuerySnapshot,
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzwcvd6XEw_Rc5TswHDGFvx_KayXZbkys",
  authDomain: "chat-room-72dde.firebaseapp.com",
  projectId: "chat-room-72dde",
  storageBucket: "chat-room-72dde.appspot.com",
  messagingSenderId: "632593627171",
  appId: "1:632593627171:web:11fb743601146945d59996",
  measurementId: "G-0Q3F57NXKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// adding code for auth functionality 
async function loginWithGoogle() {
  //within the try block:
  // create a GoogleAuthProvider which generates a credential for Google
  // Call getAuth, which returns firebase Authentication Instance 
  // Pass these 2 objects to SignInWithPopup(), which returns a user object
  // Next: Pass this information to a context provider. 
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);
    return { uid: user.uid, displayName: user.displayName };

  } catch (error) {

    if (error.code !== 'auth/cancelled-popup-request') {
      console.error(error);
    }

    return null;
  }
}

async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp()
    })
  } catch (error) {
    console.error(error)
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, 'chat-rooms', roomId, 'messages'),
      orderBy('timestamp', 'asc')
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages)
    }
  )
}


export { loginWithGoogle, sendMessage, getMessages };