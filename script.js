// Document variable declarations
let sec = 60;
let qSelector = 0;
let timer;

// Start button interaction
window.onload=function() {
    document.getElementById("start-btn").addEventListener("click", startTimer);
};

// Timer function
function startTimer() {
    timer = setInterval(function(){
        sec--;
        document.getElementById("timer").innerHTML=""+sec;
        if (sec <= 0) {
            clearInterval(timer);
            alert("Game over man!");
        }
    }, 1000);
    let startBtn = document.getElementById("start-btn");
    startBtn.remove();
    generateQuiz(qSelector);
}

// Stops the timer when the user completes the quiz and determines user score
function stopTimer() {
    clearInterval(timer);
}

// Incorrect answer timer decrement
function decrement() {
    sec -= 5;
    document.getElementById("timer").innerHTML= "" +sec;
}

// Generates the quiz items
function generateQuiz(qSelector) {
    // DOM selector variables
    let qPrimary = document.querySelector(".quiz-primary");
    let qSecondary = document.querySelector(".quiz-secondary");
    // Removes instructions and quiz title, creates a space for answer choices
    qPrimary.textContent = "";
    qSecondary.textContent = "";
    let spawnList = document.createElement("ul");
    // A block accessing the questionArray variable and populating question and answer fields
        qPrimary.textContent = questionArray[qSelector].question;
        let choices = questionArray[qSelector].answers;
        // Generates buttons for possible answer options from questionArray
        choices.forEach(function (el) {
            let aList = document.createElement("li");
            aList.textContent = el;
            qSecondary.append(spawnList);
            spawnList.append(aList);
            aList.addEventListener("click", (checkAnswer));
        });

};

// Array of questions and answers for quiz content
let questionArray = [
    {
        question: "What is 'JavaScript'?",
        answers: ["1. A morning talk show", "2. A brand of paper", "3. A coding language", "4. A charity organization"],
        rightAnswer: "3. A coding language"
    },
    {
        question: "What does the acronym 'DOM' stand for?",
        answers: ["1. Dad's Own Mustard", "2. Don't Objectify Me", "3. Daring Older Man", "4. Document Object Model"],
        rightAnswer: "4. Document Object Model"
    },
    {
        question: "Where does the method '.getElementById' search for an Id?",
        answers: ["1. In the application's DOM", "2. A police lineup", "3. Two separate places in the english alphabet", "4. In your wallet"],
        rightAnswer: "1. In the application's DOM"
    },
    {
        question: "What does an 'Event Listener' do?",
        answers: ["1. It monitors a live concert for profane language", "2. It monitors an application and waits for a specific user interaction", "3. It translates audio into ASL for people who cannot hear", "4. It does nothing, it's just there for decoration"],
        rightAnswer: "2. It monitors an application and waits for a specific user interaction"
    },
    {
        question: "What does it mean when a variable is 'undefined'?",
        answers: ["1. It is attending school and has not yet decided which major to pursue", "2. It just got out of a long-term relationship and it's not ready for labels", "3. It has been declared as a variable but has not yet been assigned a value", "4. It's hard to describe, you just know it when you see it"],
        rightAnswer: "3. It has been declared as a variable but has not yet been assigned a value"
    }
];

// Checks to see if the answer the user chose matches the correct answer
function checkAnswer(event) {
    let chosen = event.target;
    if (chosen.matches("li")) {
        let feedback = document.getElementById("feedback");

        if (chosen.textContent === questionArray[qSelector].rightAnswer) {
            feedback.textContent = "You got it!";
        
            // penalizes the user if they chose an incorrect answer by subtracting time    
        } else {
            feedback.textContent = "Incorrect!";
            decrement();
        };
    };
    
    // Advances to the next question
    qSelector++;

    if (qSelector >= questionArray.length) {
        scoreboard();
    } else {
        generateQuiz(qSelector);
    }
}

// Alters the page to display the scoreboard and its inputs

function scoreboard() {
    stopTimer();
    // Clears existing content
    let qPrimary = document.querySelector(".quiz-primary");
    let qSecondary = document.querySelector(".quiz-secondary");
    let feedback = document.getElementById("feedback");

    qPrimary.textContent = "Quiz Complete!";
    qSecondary.textContent = "Enter your initials and record your score!";
    feedback.textContent = "";
}
