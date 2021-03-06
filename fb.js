import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyCV8w9BAnlFKza0Lu3AB2xRuOC-i6UdDpY",
    authDomain: "best-cp3351-project.firebaseapp.com",
    projectId: "best-cp3351-project",
    storageBucket: "best-cp3351-project.appspot.com",
    messagingSenderId: "976208045743",
    appId: "1:976208045743:web:8a26e811056b866a2d165a"
}

firebase.initializeApp(firebaseConfig)

firebase.firestore().useEmulator("10.0.2.2", 8080)
firebase.functions().useEmulator("10.0.2.2", 5001)
firebase.auth().useEmulator("http://10.0.2.2:9099")

export default firebase