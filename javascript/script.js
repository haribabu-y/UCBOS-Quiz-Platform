function adminLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("errMessage");
    const formElement = document.getElementById("login-form").reset();

    if(username === "admin" && password === "admin") {
        message.style.color = "white";
        message.textContent = "Login Successfull!.";
        setTimeout(() => {
            window.location.href = "adminHome.html";
        },2000);
        return false;
    } else {
        message.textContent = "Invalid Username or Password?"
        // formElement.reset();
        return false;
    }
    formElement.reset();
}

// Closing the login or registration page
const closeElement = document.getElementById("closepage");
closeElement.addEventListener('click', () => {
    window.location.href = "home.html";
});

//Creating the function for registering the user
function getUsers() {
    return JSON.parse(localStorage.getItem("quizUsers") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("quizUsers", JSON.stringify(users));
}

function registerUser() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const phoneNumber = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const gender = document.forms["myform"]["gender"].value;
    const qualification = document.getElementById("qualification").value.trim();
    const address = document.getElementById("address").value.trim();

    // console.log(typeof(document.forms["myform"]["gender"].value));
    // console.log(document.getElementsByName("gender").value);
    // console.log(name+", "+age+", "+phoneNumber+", "+email+", "+gender+", "+qualification+", "+address);

    //Storing the current user in the storage
    localStorage.setItem("currentQuizUser", email);

    const user = {};
    user.name = name;
    user.age = age;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.gender = gender;
    user.qualification = qualification;
    user.address = address;

    const users = getUsers();

    //Validating the register user using their email
    const quizUser = users.some(user => (user.email === email || user.phoneNumber === phoneNumber));
    var errmessage = document.getElementById("errmsg");
    if(quizUser) {
        errmessage.textContent= "User already finished quiz!.";
        // alert("User already finished quiz!.")
        document.getElementById("myform").reset();
        setTimeout(() => {
            window.location.href = "home.html";
        },2000);
        return false;
    } 

    //validating the age
    if(age > 100 || age < 18) {
        errmessage.textContent = "Invalid Age entered!";
        return false;
    } else {
        errmessage.textContent = "";
    }

    if(phoneNumber.length > 10 || phoneNumber < 10) {
        errmessage.textContent = "Invalid Phone Number!";
        return false;
    } else {
        errmessage.textContent = "";
    }
    
    users.push(user);
    saveUsers(users);


    document.getElementById("myform").reset();

    setTimeout(() =>{
        window.location.href = "quizPage.html";
    },1000);

    return false;
}

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById("myform");
//     const subbtn = document.getElementById("submitbtn");
//     const inputFields = form.querySelectorAll("input[required]");

//     function checkFormValidity() {
//         let allFieldsFilled = true;
//         inputFields.forEach(input => {
//             if(input.value.trim() === "") {
//                 allFieldsFilled = false;
//             }
//         });

//         if(allFieldsFilled) {
//             subbtn.style.display = "block";
//         } else {
//             subbtn.style.display = "none";
//         }
//     }

//     inputFields.forEach(input => {
//         input.addEventListener('input', checkFormValidity);
//         input.addEventListener('blur', checkFormValidity);
//     });
//     checkFormValidity();

// });



