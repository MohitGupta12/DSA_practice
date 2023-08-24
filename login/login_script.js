
// import { createAccount } from './auth';
const signUp_btn = document.getElementById("signUp_btn");
const signUp_form = document.getElementById("signUp_form");
const logIn_form = document.getElementById("logIn_form");

signUp_form.addEventListener("submit", (event) => {
    event.preventDefault();
})


logIn_form.addEventListener("submit", (event) => {
    event.preventDefault();
})

console.log("login script working")

const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })

    })
})

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); //preventing form submit
        forms.classList.toggle("show-signup");
    })
})

