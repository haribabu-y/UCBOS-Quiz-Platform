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
            <label for="question">Question</label><br>
            <textarea name="question" id="question" placeholder="Type your question here" required></textarea><br>
            <label for="option1">Option 1</label>
            <input type="text" id="option1" required><br>
            <label for="option1">Option 2</label>
            <input type="text" id="option2" required><br>
            <label for="option1">Option 3</label>
            <input type="text" id="option3" required><br>
            <label for="option1">Option 4</label>
            <input type="text" id="option4"required><br>
            <label for="answer">Answer</label>
            <input type="text" id="answer" required><br>

            <button onclick="addNewQuestion()">Add Question</button>
            <button onclick="closePopup()">Cancel</button>
    `;
    openPopup(elements);
}

function addNewQuestion() {
    
}

//function for Closing the popup
function closePopup() {
    document.getElementById("popup-container").textContent = "";
}