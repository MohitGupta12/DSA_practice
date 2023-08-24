console.log("test is running")
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDbLSjZn8IzmKQy2wmisWXHSj7qAA62qNI",
    authDomain: "dsa-practice.firebaseapp.com",
    projectId: "dsa-practice",
    storageBucket: "dsa-practice.appspot.com",
    messagingSenderId: "943228978030",
    appId: "1:943228978030:web:b1dc19b9373f5d5944777f",
    measurementId: "G-XSNB2QFQ6H",
    databaseURL: "https://dsa-practice.asia-southeast1.firebaseio.com",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
let current_user = null;



onAuthStateChanged(auth, (user) => {
    const logOut_btn = document.getElementById("logOut_btn")
    const login_btn_text = document.getElementById("btn_text");
    if (user) {
        login_btn_text.innerText = "LOGOUT";

        logOut_btn.addEventListener("click", () => {
            signOut(auth).then(() => {
                console.log("logged out successfully")
                alert("logged out successfully");
            }).catch((error) => {
                console.log("error logging out successfully")
                console.log(error);
            })
        })
        // ...
    } else {
        login_btn_text.innerText = "LOGIN";

        logOut_btn.addEventListener("click", () => {
            window.location.href = "../login/login.html";
            console.log("login clicked");
        })
    }
})
console.log(current_user);


