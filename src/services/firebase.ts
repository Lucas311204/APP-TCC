import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDbdngozElYBEYdk98Qei3BlalFR3P1h8I',
  authDomain: 'peat-f2f94.firebaseapp.com',
  databaseURL: 'https://peat-f2f94-default-rtdb.firebaseio.com',
  projectId: 'peat-f2f94',
  storageBucket: 'peat-f2f94.appspot.com',
  messagingSenderId: '346964342472',
  appId: '1:346964342472:web:519a149657fd9e95c817fd',
}

const firebase = initializeApp(firebaseConfig)
export default firebase

export const firestore = getFirestore(firebase)
