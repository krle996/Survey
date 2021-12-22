// Get input fields
const surveyTitleDOM = document.querySelector('.survey-title');
const deadlineDOM = document.querySelector('.survey-deadline');
const questionDOM = document.querySelector('.survey-question');
const answersDOM = document.querySelectorAll('.survey-answers');

const showTableDOM = document.querySelector('.show-table');
const tableDOM = document.querySelector('.table');

// Get buttons
const btnQuestion = document.querySelector('.new-question');
const btnShowQuestions = document.querySelector('.show-questions');
const btnSubmit = document.querySelector('.submit');

let questionArr = [];
showTableDOM.style.display = 'none';

// Function for adding new question
const addQuestion = (e) => {
    e.preventDefault();

    const questionObject = {};
    let answersArr = [];

    if(questionDOM.value !== '') {
        questionObject.title = questionDOM.value;
        for(answer of answersDOM) {
            if(answer.value !== '') {
                answersArr.push(answer.value);
                continue;
            }
        }
        questionObject.answers = answersArr;

        questionArr.push(questionObject);

        clearFields();
    }
    else {
        alert('Morate uneti bar jedno pitanje');
    }
};

// Function for displaying questions and answers in the table
const showQuestions = (e) => {
    e.preventDefault();

    let tableRow = '';

    tableDOM.innerHTML = '<tr><th>Pitanja</th><th>Odgovori</th></tr>';

    if(questionArr.length > 0) {
        questionArr.forEach(question => {
            tableRow += `
                <tr>
                    <td>${question.title}</td>
                    <td>${question.answers}</td>
                </tr>
        `;
        });

        tableDOM.insertAdjacentHTML('beforeend', tableRow);
        showTableDOM.style.display = 'block';
    }
    else {
        alert('Nema pitanja za prikazivanje');
    }
};

// Function for creating the survey form
const submitForm = (e) => {
    e.preventDefault();

    if(surveyTitleDOM.value !== '' && deadlineDOM.value !== '' && questionArr.length > 0) {
        const survey = {};
        survey.title = surveyTitleDOM.value;
        survey.deadline = deadlineDOM.value;
        survey.questions = questionArr;

        postSurvey(survey)
        .then(data => alert(data.message))
        .catch(err => alert('Doslo je do greske, pokusajte ponovo'));

        surveyTitleDOM.value = '';
        deadlineDOM.value = '';
        questionArr = [];
        showTableDOM.style.display = 'none';
    }
    else {
        alert('Polja naziv upitnika, krajnji rok i pitanje moraju biti popunjena');
    }
};

const clearFields = () => {
    questionDOM.value = '';
    answersDOM.forEach(answer => answer.value = '');
};

// Async function for sending data to API
const postSurvey = async (data) => {
    const response  = await fetch('http://projectest.xyz/api/surveys', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
};

// Event listeners
btnQuestion.addEventListener('click', addQuestion);

btnShowQuestions.addEventListener('click', showQuestions);

btnSubmit.addEventListener('click', submitForm);


