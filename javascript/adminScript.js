// Script for the admin page

function openPopup(htmlElements) {
    const popup = document.getElementById("popup-container");
    popup.innerHTML = `
        <div class="popup-overlay">
            <div class="popup-box">
                <p class="close" onclick="closePopup()">x</p>
                ${htmlElements}
            </div>
        </div>
    `;
}

function openAddQuestionpopup() {
    const elements = `
        <h2>Add New Question</h2>
        <form>
            <label for="questionNo">Question No.</label>
            <input type="text" id="questionNo" required><br>
            <label for="question">Question</label><br>
            <textarea name="question" id="question" placeholder="Type your question here" required></textarea><br>
            <label for="option1">Option 1</label>
            <input type="text" id="option1" required><br>
            <label for="option2">Option 2</label>
            <input type="text" id="option2" required><br>
            <label for="option3">Option 3</label>
            <input type="text" id="option3" required><br>
            <label for="option4">Option 4</label>
            <input type="text" id="option4"required><br>
            <label for="answer">Answer</label>
            <input type="text" id="answer" required><br>

            <button onclick="addNewQuestion()">Add Question</button>
            <button onclick="closePopup()">Cancel</button>
    `;
    openPopup(elements);
}

function addNewQuestion() {
    const quizquestion = {
        questionNo : document.getElementById("questionNo").value.trim(),
        question : document.getElementById("question").value.trim(),
        option1 : document.getElementById("option1").value.trim(),
        option2 : document.getElementById("option2").value.trim(),
        option3 : document.getElementById("option3").value.trim(),
        option4 : document.getElementById("option4").value.trim(),
        answer : document.getElementById("answer").value.trim()
    };

    if(!quizquestion.question || !quizquestion.question || !quizquestion.option1 || !quizquestion.option2 || !quizquestion.option3 || !quizquestion.option4 || !quizquestion.answer) {
        alert("Please fill all the fields!");
        return;
    }

    const questions = getQuizQuestions();
    questions.push(quizquestion);
    setQuizQuestion(questions);
}

//function for Closing the popup
function closePopup() {
    document.getElementById("popup-container").textContent = "";
}

//Getting the quiz question from the local storage
function getQuizQuestions() {
    return JSON.parse(localStorage.getItem("quizQuestions") || "[]");
}

//Saving the quiz question to the local stroage
function setQuizQuestion(questions) {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
}


//Function to add the stored quiz questions to the table
function addQuizQuestionsToTable() {
    const quizQuestionsTableBody = document.getElementById("questionsTableBody");
    const questions = getQuizQuestions();

    if(questions.length === 0) {
        quizQuestionsTableBody.innerHTML = `<tr><td clospan="4">No questions found!. Add the Questions</tr>`;
        return;
    }

    quizQuestionsTableBody.innerHTML = "";
    // var serialNumber = 1;
    questions.forEach((ques) => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${ques.questionNo}</td>
            <td>${ques.question}</td>
            <td><button class="actionBtn" onclick='editQuestion(${JSON.stringify(ques)})'><i class="fas fa-pencil"></i></button></td>
            <td><button class="actionBtn" onclick='deleteQuestion("${ques.questionNo}")'><i class="fas fa-trash-can"></i></button></td>
        `;
        quizQuestionsTableBody.appendChild(newRow)
    });
}

//Creating the edit question popup
function editQuestion(ques) {
    const elements = `
        <h2>Edit Question</h2>
        <label for="questionNo">Question No.</label>
        <input type="text" id="questionNo" value="${ques.questionNo}"><br>
        <label for="question">Question</label>
        <textarea name="question" id="question">${ques.question}</textarea><br>
        <label for="option1">Option 1</label>
        <input type="text" id="option1" value="${ques.option1}"><br>
        <label for="option2">Option 2</label>
        <input type="text" id="option2" value="${ques.option2}"><br>
        <label for="option3">Option 3</label>
        <input type="text" id="option3" value="${ques.option3}"><br>
        <label for="option4">Option 4</label>
        <input type="text" id="option4" value="${ques.option4}"><br>
        <label for="answer">Answer</label>
        <input type="text" id="answer" value="${ques.answer}"><br>

        <button onclick="updateQuestion('${ques.questionNo}')">Save</button>
        <button onclick="closePopup()">Cancel</button>
    `;
    openPopup(elements);
}

//Updateing the Question in the storage
function updateQuestion(quesNo) {
    const quizQuestions = getQuizQuestions();

    const index = quizQuestions.findIndex(q => q.questionNo === quesNo);
    if(index === -1) {
        return;
    }

    quizQuestions[index].questionNo = document.getElementById("questionNo").value.trim();
    quizQuestions[index].question = document.getElementById("question").value.trim();
    quizQuestions[index].option1 = document.getElementById("option1").value.trim();
    quizQuestions[index].option2 = document.getElementById("option2").value.trim();
    quizQuestions[index].option3 = document.getElementById("option3").value.trim();
    quizQuestions[index].option4 = document.getElementById("option4").value.trim();
    quizQuestions[index].answer = document.getElementById("answer").value.trim();

    setQuizQuestion(quizQuestions);
    closePopup();
    addQuizQuestionsToTable();
    
}

// Creating the Delete popup
function deleteQuestion(quesNo) {
    const elements = `
        <h2>Are you sure to delete this Question?</h2>
        <button onclick="deleteQuizQuestion('${quesNo}')">Yes</button>
        <button onclick="closePopup()">Cancel</button>
    `;
    openPopup(elements);
}

//Deleting the question from the storage
function deleteQuizQuestion(quesNo) {
    let quizQuestions = getQuizQuestions();
    quizQuestions = quizQuestions.filter(q => q.questionNo !== quesNo);
    setQuizQuestion(quizQuestions);
    closePopup();
    addQuizQuestionsToTable();
}


// Adding the questions to the Quiz page
function loadingQuizQuestions() {
    const container = document.getElementById("quiz-container");
    const quizQuestions = getQuizQuestions();
    quizQuestions.forEach((quizQuestion) => {
        const questionContainer = document.createElement("div");
        questionContainer.className = "questiondiv";

        questionContainer.innerHTML = `
            <p>${quizQuestion.questionNo}. ${quizQuestion.question}</p>
            <div class="optionfields">
                <div class="options">
                    <input type="radio" name="${quizQuestion.questionNo}question" value="${quizQuestion.option1}" id="${quizQuestion.questionNo}option1">
                    <label for="${quizQuestion.questionNo}option1">${quizQuestion.option1}</label>
                </div>
                <div class="options">
                    <input type="radio" name="${quizQuestion.questionNo}question" value="${quizQuestion.option2}" id="${quizQuestion.questionNo}option2">
                    <label for="${quizQuestion.questionNo}option2">${quizQuestion.option2}</label>
                </div>
                <div class="options">
                    <input type="radio" name="${quizQuestion.questionNo}question" value="${quizQuestion.option3}" id="${quizQuestion.questionNo}option3">
                    <label for="${quizQuestion.questionNo}option3">${quizQuestion.option3}</label>
                </div>
                <div class="options">
                    <input type="radio" name="${quizQuestion.questionNo}question" value="${quizQuestion.option4}" id="${quizQuestion.questionNo}option4">
                    <label for="${quizQuestion.questionNo}option4">${quizQuestion.option4}</label>
                </div>
            </div>
        `;
        container.appendChild(questionContainer);
    });

    // container.innerHTML = `
    //     <div class="questiondiv">
    //         <p>1. Question</p>
    //         <div class="optionfields">
    //             <div class="options">
    //                 <input type="radio" name="question">
    //                 <p>Option 1</p>
    //             </div>
    //             <div class="options">
    //                 <input type="radio" name="question">
    //                 <p>Option 1</p>
    //             </div>
    //             <div class="options">
    //                 <input type="radio" name="question">
    //                 <p>Option 1</p>
    //             </div>
    //             <div class="options">
    //                 <input type="radio" name="question">
    //                 <p>Option 1</p>
    //             </div>
    //         </div>    
    //     </div>
    // `;
}

function collectResult() {
    const len = getQuizQuestions().length;
    // console.log(len);

    //collecting the user submitted answers
    const submittedAnswers=[];
    for(let i=0;i<len;i++) {
        submittedAnswers.push(document.forms["quizForm"][(i+1)+"question"].value);
    }
    console.log(submittedAnswers);
    
    //Collecting the original answers from storage
    const quizQuestions = getQuizQuestions();
    const answers = [];
    quizQuestions.forEach(q => {
        answers.push(q.answer);
    });
    console.log(answers);
    
    let score = 0;
    for(let i=0;i<answers.length;i++) {
        if(submittedAnswers[i] == answers[i]) {
            score++;
        }
    }

    console.log(score);
    console.log(new Date());
    
    const quizUsers = JSON.parse(localStorage.getItem("quizUsers"));
    // console.log(quizUsers);
    
    const currentUser = localStorage.getItem("currentQuizUser");
    // console.log(currentUser);
    
    const quizuser = quizUsers.find(user => (user.name === currentUser));
    // console.log(quizuser);

    //Getting submission time 
    const fulldate = new Date();
    const day = String(fulldate.getDate()).padStart(2, "0");
    const month = String(fulldate.getMonth() + 1).padStart(2, "0");
    const year = String(fulldate.getFullYear());
    const hours = String(fulldate.getHours() % 12 || 12).padStart(2,"0");
    const minutes = String(fulldate.getMinutes()).padStart(2,"0");
    const seconds = String(fulldate.getSeconds()).padStart(2,"0");
    const ampm = fulldate.getHours() < 12 ? "AM" : "PM";

    let submissionTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    
    quizuser.score = score;
    quizuser.submissionTime = submissionTime;
    quizuser.totalQuestions = answers.length;
    
    // quizUsers.push(quizuser);
    localStorage.setItem("quizUsers", JSON.stringify(quizUsers));

    document.getElementById("quizForm").reset();

    return false;
}

//Adding the quiz Result to the reesult table
function addResultsToTable() {
    const resultTableBody = document.getElementById("resultTableBody");
    const quizUsers = JSON.parse(localStorage.getItem("quizUsers"));
    
    if(quizUsers.length === 0) {
        resultTableBody.innerHTML = `<tr><td colspan="5">No Results found!.</td></tr>`;
        return;
    }

    resultTableBody.innerHTML = "";
    quizUsers.forEach((quizUser) => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${quizUser.name}</td>
            <td>${quizUser.qualification}</td>
            <td>${quizUser.score}/${quizUser.totalQuestions}</td>
            <td>${quizUser.submissionTime}</td>
            <td><a href="#">More Details</a></td>
        `;
        resultTableBody.appendChild(newRow);
    });
}