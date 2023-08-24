// Create a variable to hold the JSON data from the data.json file
let jsonData;
console.log("script is running");

// Select the container element with the class 'innerContent'
const container = document.querySelector('.innerContent');

// Use the Fetch API to get the JSON data from data.json file
fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        // Assign the retrieved data to the jsonData variable
        jsonData = data;
        // Call the BuildCard with the retrieved data as parameter
        BuildCard(jsonData);
    })
    .catch(error => console.error(error));

function BuildCard(data) {
    // Loop through the data and create a card element for each data item
    for (let i = 0; i < 15; i++) {

        // Create a Card element that will have content
        const card_elm = document.createElement('div');

        //html structure that need to be created
        /*<div class="card" id ="card1">
            <div class="CardContent">
            <div class="start">Start Now</div>
            <div class="CardTitle">Array</div>
            <div class="CardTitle2">Total Questions</div>
            <div class="CardTitle2">Not Yet Started</div> 
        </div > */

        // Add an id and class to the Card element
        let name = `card${i}`;
        card_elm.classList.add('card');
        card_elm.setAttribute('id', name);

        // Create a Content element that will have 4 child elements
        const content_elm = document.createElement('div');
        content_elm.classList.add('CardContent');

        // Create a start element and add it to the content element
        const start_elm = document.createElement('div');
        start_elm.classList.add('start');
        start_elm.innerText = "Start Now ";
        content_elm.appendChild(start_elm);

        // Create a title element and add it to the content element
        const title_elm = document.createElement('div');
        title_elm.classList.add('CardTitle');
        title_elm.innerText = data.data[i].topicName;
        content_elm.appendChild(title_elm);

        // Create a questions element and add it to the content element
        const questions_elm = document.createElement('div');
        questions_elm.classList.add('CardTitle2');
        const totalQuestions = ` Total Questions: ${data.data[i].questions.length}`;
        questions_elm.innerText = totalQuestions;
        content_elm.appendChild(questions_elm);

        // Create a status element and add it to the content element
        const status_elm = document.createElement('div');
        status_elm.classList.add('CardTitle2');
        status_elm.innerText = "Not Yet Started";
        content_elm.appendChild(status_elm);

        // Add all child elements to the content element
        let childElements = [start_elm, title_elm, questions_elm, status_elm];
        for (let i = 0; i < childElements.length; i++) {
            let element = childElements[i];
            content_elm.appendChild(element);
        }

        // Add the content element to the card element
        card_elm.appendChild(content_elm);

        // Add the card element to the container element
        container.appendChild(card_elm);

        // Get the card element by id and add a click event listener to redirect to question.html
        const card = document.getElementById(`card${i}`);
        card.addEventListener('click', function () {
            localStorage.setItem('clickedCard', card.id);
            window.location.href = '../question_page/question.html';
        });

    }
}










