const questions = [
    {
        question: "What is the purpose of a test case?",
        answers: [
            { text: "To randomly explore an application", correct: false },
            { text: "To explain the software architecture", correct: false },
            { text: "To define input, execution conditions, and expected results for a test", correct: true },
            { text: "To report customer satisfaction", correct: false }
        ]
    },
    {
        question: "Which testing level verifies that combined components work together as expected?",
        answers: [
            { text: "Unit Testing", correct: false },
            { text: "Acceptance Testing", correct: false },
            { text: "Integration Testing", correct: true },
            { text: "Regression Testing", correct: false }
        ]
    },
    {
        question: "In Agile testing, what does TDD stand for?",
        answers: [
            { text: "Test-Driven Development", correct: true },
            { text: "Time-Dependent Debugging", correct: false },
            { text: "Technical Data Design", correct: false },
            { text: "Test Design Document", correct: false }
        ]
    },
    {
        question: "Which of the following is a non-functional type of testing?",
        answers: [
            { text: "Smoke Testing", correct: false },
            { text: "Load Testing", correct: true },
            { text: "Unit Testing", correct: false },
            { text: "Regression Testing", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", handleNextButton);

startQuiz();
