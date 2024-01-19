// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPiJvwzjFL-q3vFjavLF0BZhXrlBjssnE",
    authDomain: "empweb2324.firebaseapp.com",
    databaseURL: "https://empweb2324-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "empweb2324",
    storageBucket: "empweb2324.appspot.com",
    messagingSenderId: "465054098390",
    appId: "1:465054098390:web:91dacda80c331e3d0c7a77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function submitPost() {
    var text = document.getElementById("postTextArea");
    var user = document.cookie.split('=')[1];
    var time = new Date().getTime();
    var page = urlParams.get('page_name');

    set(ref(database, page), {
        text: text,
        user: user,
        time : time
    });

    set(ref(database, user), {
        text: text,
        page: page,
        time : time
    });
}