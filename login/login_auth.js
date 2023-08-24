
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


import {
    getDatabase,
    ref,
    set, get
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

import {
    data
} from "../data/db_data.js"

console.log("auth Script running")

const firebaseConfig = {
    apiKey: "AIzaSyDbLSjZn8IzmKQy2wmisWXHSj7qAA62qNI",
    authDomain: "dsa-practice.firebaseapp.com",
    projectId: "dsa-practice",
    storageBucket: "dsa-practice.appspot.com",
    messagingSenderId: "943228978030",
    appId: "1:943228978030:web:b1dc19b9373f5d5944777f",
    measurementId: "G-XSNB2QFQ6H",
    databaseUrl: "https://dsa-practice-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app, 'https://dsa-practice-default-rtdb.asia-southeast1.firebasedatabase.app');



let curr_user;
const db_data = data;




//register user

document.getElementById("signUp_btn").addEventListener("click", (user) => {
    const email = document.getElementById("signUp_email").value;
    const password = document.getElementById("signUp_password").value;
    const username = document.getElementById('signUp_username').value;

    const err = document.querySelector("#err_signup");
    console.log(err);
    console.log(username, email, password);
    const usernameRef = ref(database, `Users/${username}`);
    get(usernameRef).then((snapshot) => {
        if (snapshot.exists()) {
            // Username already exists, inform the user and exit the function
            err.innerHTML = `<div>Username ${username} is already taken. Please choose a different username.</div>`;
            console.log(snapshot.exists());
        } else {
            console.log(snapshot.exists());
            //register in firebase
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    curr_user = username;
                    console.log(curr_user);
                    alert("User Registration Successful")

                    const new_data = {
                        dbData: db_data,
                        uid: userCredential.user.uid,
                        name: curr_user
                    }
                    console.log(new_data);
                    set(ref(database, `Users/${curr_user}`), new_data).then(() => {
                        alert('Data stored successfully');

                        window.location.href = "../main_page/main_page.html";
                    }).catch((err) => {
                        alert('Error creating data: ' + err);
                    })


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    err.innerHTML = `<div>${errorMessage}</div>`;
                    // ..
                });
        }
    })


});



console.log("outside function:" + curr_user)
// Sign in as a user
document.getElementById("logIn_btn").addEventListener("click", () => {

    const email = document.getElementById("logIn_email").value;
    const password = document.getElementById("logIn_password").value;
    const err = document.getElementById("err_login");

    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            alert("User Logged In Successfully")
            window.location.href = "../main_page/main_page.html";

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            err.innerHTML = `<div>${errorMessage}</div>`;
        });

});
