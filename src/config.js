import firebase from 'firebase';

export const appName = 'reactapp-23806';

export const firebaseConfig = {
    apiKey: "AIzaSyAh6nhFPeQo4pfVaxyaBIs_kV1ShtOcdtI",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "794683926058"
};

firebase.initializeApp(firebaseConfig);
