import Firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyA_Y3HnTvRL2YfBWSi-mOA4wr70_GEwzvE',
  authDomain: 'laychat-c44af.firebaseapp.com',
  databaseURL: 'https://laychat-c44af.firebaseio.com',
  projectId: 'laychat-c44af',
  storageBucket: 'laychat-c44af.appspot.com',
  messagingSenderId: '830152642202',
  appId: '1:830152642202:web:bdc46008cc21e379bf5923',
  measurementId: 'G-YJR2YT62ZX'
};

let app = Firebase.initializeApp(firebaseConfig);

const db = app.database();
export { db, app };
