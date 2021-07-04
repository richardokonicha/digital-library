import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId
}

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
}

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const db = firebase.firestore()

export const signInWithGoogle = () => {
    firebase.auth().signInWithPopup(provider)
}

export default firebase
