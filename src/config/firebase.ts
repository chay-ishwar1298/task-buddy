import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { envConfig } from '.'

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
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
