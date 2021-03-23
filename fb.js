import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

// const firebaseConfig = {
//     apiKey: "AIzaSyCV8w9BAnlFKza0Lu3AB2xRuOC-i6UdDpY",
//     authDomain: "best-cp3351-project.firebaseapp.com",
//     projectId: "best-cp3351-project",
//     storageBucket: "best-cp3351-project.appspot.com",
//     messagingSenderId: "976208045743",
//     appId: "1:976208045743:web:8a26e811056b866a2d165a"
// }
const firebaseConfig = {
    apiKey: "AIzaSyBHVeqizV81P-_ni1r9edt7_I8fOlr2OWo",
    authDomain: "rn-1-a4193.firebaseapp.com",
    projectId: "rn-1-a4193",
    storageBucket: "rn-1-a4193.appspot.com",
    messagingSenderId: "270778823937",
    appId: "1:270778823937:web:ed7ac90f09f6ac1090d700",
    measurementId: "G-JGF6NWVDM3"
}
firebase.initializeApp(firebaseConfig)

firebase.firestore().useEmulator("10.0.2.2", 8080)
firebase.functions().useEmulator("10.0.2.2", 5001)
firebase.auth().useEmulator("http://10.0.2.2:9099")

export default firebase