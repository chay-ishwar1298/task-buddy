import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { envConfig } from '.'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
	apiKey: envConfig.firebase.apiKey,
	authDomain: envConfig.firebase.authDomain,
	projectId: envConfig.firebase.projectId,
	storageBucket: envConfig.firebase.storageBucket,
	messagingSenderId: envConfig.firebase.messagingSenderId,
	appId: envConfig.firebase.appId,
	measurementId: envConfig.firebase.measurementId,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
