import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration environment variables

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, "user"), {
			uid: user.uid,
			name: name,
			authProvider: "local",
			email: email,
			password: password,
		});
		toast.success("Successfully Signed Up");
	} catch (error) {
		console.log(error);
		// alert(error);
		toast.error("Error Signing Up: " + error.code.split("/")[1].split("-").join(" "));
	}
};

const LogIn = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		toast.success("Successfully Logged In");
	} catch (error) {
		console.log(error);
		// alert(error);
		toast.error("Invalid Email or Password", error);
	}
};

const LogOut = async () => {
	signOut(auth);
};

export { auth, db, SignUp, LogIn, LogOut };
