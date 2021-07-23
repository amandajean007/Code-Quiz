  // Variables
const timerEl = document.getElementById('countdown');
var timeLeft = 30;
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');
  // keep track of user's answers
var numCorrect = 0;
const myQuestions = [
  {
    question: "1. Commonly used data types DO NOT include:",
    answers: {
      a: "strings",
      b: "booleans",
      c: "alerts",
      d: "numbers"
    },
    correctAnswer: "c"
  },
  {
    question: "2. The condition in an if/else statement is enclosed within ____.",
    answers: {
      a: "quotes",
      b: "curly brackets",
      c: "parentheses",
      d: "square brackets"
    },
    correctAnswer: "c"
  },
  {
    question: "3. Arrays in JavaScript can be used to store ____.",
    answers: {
      a: "numbers and strings",
      b: "other arrays",
      c: "booleans",
      d: "all of the above"
    },
    correctAnswer: "d"
  },
  {
    question: "4. A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      a: "JavaScript",
      b: "terminal/bash",
      c: "for loops",
      d: "console.log"
    },
    correctAnswer: "d"
  }
];

function showResults(){
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
      timeLeft + 0;
    }

      // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
      timeLeft -= 5;
    }

  // Appends tag as child of document body
  var linebreak = document.createElement('br');
  document.body.appendChild(tag).appendChild(linebreak);
});
}

function buildQuiz(){
  // variable to store the HTML output
  const output = [];
  output.push(
    '<div class="slide"></div>'
    );
  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" id=radioBtn value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
    }
  );
// finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
    refreshButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
    startButton.style.display = 'none';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
    refreshButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
    refreshButton.style.display = 'none';
  }
  if(currentSlide === 0){
    nextButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

function firstSlide() {
  showSlide(currentSlide - 3)
  window.location.reload(true); 
  
  // uncheck all radio buttons
  document.getElementById("radioBtn").checked = false;
}

function stopTimer() {
  timeLeft = 1;
}

function resetQuestions() {
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" id=radioBtn value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
    }
  );
}

function end() {
  // Stores user response in variable
  var name = prompt("What is your name?", "Smarty");

  let score = numCorrect + timeLeft;

  // Creates element based on tag entered by user
  var tag = document.createElement(name);

  // Adds text content to created tag
  tag.textContent = name + "'s Score: " + score;

  // Appends tag as child of document body
  var linebreak = document.createElement('br')
  document.body.appendChild(tag).appendChild(linebreak);
  
  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

//Create a Timer
function countdown() {
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft + " seconds left";
    if(timeLeft === 0) {
      clearInterval(timeInterval);
    }
    if(timeLeft === 1) {
      timerEl.textContent = timeLeft + " second left";
    }
  }, 1000);
}

// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const refreshButton = document.getElementById("refresh");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
startButton.addEventListener("click", countdown);
startButton.addEventListener("click", showNextSlide);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
nextButton.addEventListener("click", showResults);
submitButton.addEventListener('click', end);
submitButton.addEventListener('click', stopTimer);
refreshButton.addEventListener('click', firstSlide);