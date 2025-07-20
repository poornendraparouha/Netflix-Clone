import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYDrHoWcCxaOcda_ZW4PHiOH1_6AIx0ls",
  authDomain: "netflix-clone-71eb4.firebaseapp.com",
  projectId: "netflix-clone-71eb4",
  storageBucket: "netflix-clone-71eb4.firebasestorage.app",
  messagingSenderId: "905816301175",
  appId: "1:905816301175:web:1357b44aebf3261a377072"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email,
            password: password
            
        })
        toast.success("Successfully Signed Up");
    } catch (error) {
        console.log(error);
        // alert(error);
        toast.error("Error Signing Up: " + error.code.split('/')[1].split('-').join(' '));
        
        
    }
}

const LogIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Successfully Logged In");

    } catch (error) {
        console.log(error);
        // alert(error);
        toast.error("Invalid Email or Password", error);
    }
}

const LogOut = async () => {
    signOut(auth)
}

export { auth, db, SignUp, LogIn, LogOut };