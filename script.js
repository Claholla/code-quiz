// Document variable declarations
let sec = 60;
let qSelector = 0;
// Start button interaction
window.onload=function() {
    document.getElementById("start-btn").addEventListener("click", timer);
};

// Timer function
function timer() {
    let timer = setInterval(function(){
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
        answers: ["A morning talk show", "A brand of paper", "A coding language", "A charity organization"],
        rightAnswer: "A coding language"
    },
    {
        question: "What does the acronym 'DOM' stand for?",
        answers: ["Dad's Own Mustard", "Don't Objectify Me", "Daring Older Man", "Document Object Model"],
        rightAnswer: "Document Object Model"
    },
    {
        question: "Where does the method '.getElementById' search for an Id?",
        answers: ["In the application's DOM", "A police lineup", "Two separate places in the english alphabet", "In your wallet"],
        rightAnswer: "In the application's DOM"
    },
    {
        question: "What does an 'Event Listener' do?",
        answers: ["It monitors a live concert for profane language", "It monitors an application and waits for a specific user interaction", "It translates audio into ASL for people who cannot hear", "It does nothing, it's just there for decoration"],
        rightAnswer: "It monitors an application and waits for a specific user interaction"
    },
    {
        question: "What does it mean when a variable is 'undefined'?",
        answers: ["It is attending school and has not yet decided which major to pursue", "It just got out of a long-term relationship and it's not ready for labels", "It has been declared as a variable but has not yet been assigned a value", "It's hard to describe, you just know it when you see it"],
        rightAnswer: "It has been declared as a variable but has not yet been assigned a value"
    }
];

function checkAnswer(event) {
    let chosen = event.target;
    if (chosen.matches("li")) {
        let feedback = document.createElement("h2");
        feedback.setAttribute("id", "feedback");

        if (chosen.textContent === questionArray[qSelector].rightAnswer) {
            feedback.textContent = "You got it!";
            
        } else {
            feedback.textContent = "Incorrect!";
            decrement();
        };
    };
    
    qSelector++;

    if (qSelector >= questionArray.length) {
        return;
    } else {
        generateQuiz(qSelector);
    }
} 
