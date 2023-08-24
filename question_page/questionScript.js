

import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app, 'https://dsa-practice-default-rtdb.asia-southeast1.firebasedatabase.app');

let jsonData;


const clickedCard = localStorage.getItem('clickedCard');


const clicked_id = clickedCard.slice(4);


const topicName_elm = document.querySelector('#topic_name');


const totalQuestions_element = document.querySelector('#total_question');


const ques_table_elm = document.querySelector('.QuestionTable');

fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {

        jsonData = data;
        console.log(jsonData);
        console.log(data.data[0].questions.length);
        buildTable(jsonData);
    })
    .catch(error => console.error(error));


function buildTable(data) {

    let jsonData = data.data[clicked_id];


    let questions_List = jsonData.questions;
    // data.data[clicked_id].questions.Problem
    //UID.clicked_id.questions[question_id].Done

    topicName_elm.innerText = data.data[clicked_id].topicName


    totalQuestions_element.innerText = questions_List.length


    for (let i = 0; i < questions_List.length; i++) {


        const row = document.createElement('tr');


        const checkbox_row = document.createElement('td');


        const checkbox = document.createElement('input');
        checkbox.id = 'checkbox';
        checkbox.setAttribute('type', 'checkbox');


        checkbox_row.appendChild(checkbox);


        const id_row = document.createElement('td');
        id_row.id = `row_num${i}`;
        id_row.innerText = i + 1;


        const question_row = document.createElement('td');





        const question = document.createElement('a');


        const links = document.createElement('td');


        const link1 = document.createElement('a');
        const img1 = document.createElement('img');
        img1.classList.add('logo');
        gettingLogo(questions_List[i].URL, img1);
        link1.href = questions_List[i].URL;
        link1.appendChild(img1);


        const link2 = document.createElement('a');
        const img2 = document.createElement('img');
        img2.classList.add('logo');
        gettingLogo(questions_List[i].URL2, img2);
        link2.href = questions_List[i].URL2;
        link2.appendChild(img2);


        links.appendChild(link1);
        links.appendChild(link2);

        const action = document.createElement('td');
        action.style = '  text-align:center;';
        const bookmark = document.createElement('i');
        bookmark.id = "action";
        bookmark.className = 'fa-regular fa-bookmark ';
        bookmark.style = 'color: #5bcd78;';
        action.appendChild(bookmark);

        bookmark.addEventListener('click', function () {
            bookmark.classList.toggle('fa-regular');
            bookmark.classList.toggle('fa-solid');
        });


        question.innerText = questions_List[i].Problem;


        question_row.appendChild(question);


        row.appendChild(checkbox_row);
        row.appendChild(id_row);
        row.appendChild(question_row);
        row.appendChild(links);
        row.appendChild(action);


        ques_table_elm.appendChild(row);

    }


    console.log(ques_table_elm);


    const checkbox_array = document.querySelectorAll('#checkbox')

    console.log(checkbox_array);

    for (let i = 0; i < checkbox_array.length; i++) {
        const checkboxElm = checkbox_array[i];
        const question_id = i
        // const uid = getUserUID;
        // console.log(uid);
        checkboxElm.addEventListener('click', updateDbData("mohit1", clicked_id, question_id));
    }

}



function updateDbData(username, clicked_id, question_id) {

    const updated_data = {
        "Done": true,
        "Bookmark": false
    }
    update(ref(database, "Users/" + username + "/dbData/" + `${clicked_id}/questions/${question_id}`), updated_data).then(() => {
        console.log("data updated")
    }).catch((err) => {
        alert('Error creating data: ' + err);
    })
}


function gettingLogo(url, img) {
    if (url.includes('geeksforgeeks')) {
        img.src = '../assets/Logo/gfg.png';
    }
    if (url.includes('codingninjas')) {
        img.src = '../assets/Logo/coding ninjas.jpg';
    }

    if (url.includes('leetcode')) {
        img.src = '../assets/Logo/leetcode.webp';
    }

}

