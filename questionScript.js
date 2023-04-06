
// Declare a variable to hold the fetched data
let jsonData;

// Find the element with the class "QuestionTable" and store it in a variable
const ques_table_elm = document.querySelector('.QuestionTable');

// Use the fetch API to retrieve the contents of a file called "data.json"
// When the response is received, convert it to JSON and store it in the jsonData variable
// Call the buildTable function, passing in the jsonData variable as an argument
// If there is an error, log it to the console
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        console.log(jsonData);
        console.log(data.data[0].questions.length);
        buildTable(jsonData);
    })
    .catch(error => console.error(error));

// Define a function that takes a JSON object as an argument
function buildTable(data) {

    // Extract the questions array from the JSON object
    let questions_List = data.data[0].questions;

    //html structure that need to be created
    /* <tr>
        <td><input type="checkbox"></td>
        <td>1</td>

        <td><a href="">Reverse the array</a></td>
        <td>50</td>

        <td></td>
    </tr> */

    // Loop through the questions array
    for (let i = 0; i < questions_List.length; i++) {

        // Create a new table row element
        const row = document.createElement('tr');

        // Create a new table data element for the checkbox
        const checkbox_row = document.createElement('td');

        // Create a new checkbox element and set its type to "checkbox"
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        // Append the checkbox to the checkbox row
        checkbox_row.appendChild(checkbox);

        // Create a new table data element for the question ID and set its text content to i+1
        const id_row = document.createElement('td');
        id_row.innerText = i + 1;

        // Create a new table data element for the question and set its text content to the question text
        const question_row = document.createElement('td');

        // Extract the URL from the first question in the questions array
        const xl_link = questions_List[0].URL;

        // Create a new link element and set its href attribute to the extracted URL
        const question = document.createElement('a');
        question.setAttribute('href', xl_link);

        // Set the text content of the link element to the question text
        question.innerText = questions_List[i].Problem;

        // Append the link element to the question row
        question_row.appendChild(question);

        // Append the checkbox row, ID row, and question row to the table row
        row.appendChild(checkbox_row);
        row.appendChild(id_row);
        row.appendChild(question_row);

        // Append the table row to the QuestionTable element
        ques_table_elm.appendChild(row);

    }

    // Log the QuestionTable element to the console
    console.log(ques_table_elm);

}