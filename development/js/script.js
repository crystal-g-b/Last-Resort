const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const intro = document.querySelector("#intro");
const introP = document.querySelector("#intro-p");
const pSection = document.querySelector(".paragraph-section");
const controls = document.querySelector(".controls");
let drinkName;
let musicPlaylist;
let center = document.querySelector(".center-content");
let results = document.querySelector("#results-section")
let restartBtn = document.querySelector("#restart-btn");

// const resultsSection = document.querySelector("#results");
let score = 0;
let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
restartBtn.addEventListener('click', reStart)

function startGame() {
  startButton.classList.add('hide')
    console.log("the game has begun!")
    intro.classList.add("hide");
    introP.classList.add("hide");
    pSection.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add("btn","button", "is-link", "is-focused");
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
      score += 20;
      console.log("score: " + score)
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    questionContainerElement.classList.add('hide');
    newDiv = document.createElement('div');
    newDiv.classList = "results-section";
    controls.appendChild(newDiv);
    newP = document.createElement("p");
    newP.id = "results";
    newP.innerText = "Thank you for playing! Your score is " + score;
    newDiv.appendChild(newP);
    let musicInsert = document.createElement('div')
    let drinksInsert = document.createElement('div')
    musicDiv = newDiv.appendChild(musicInsert);
    musicDiv.id = "music";
    drinksDiv = newDiv.appendChild(drinksInsert);
    drinksDiv.id = "drinks";
    musicDiv.innerText = "Here is your music playlist!";
    drinksDiv.innerText = "Here is your drink!";
    center.appendChild(musicDiv);
    center.appendChild(drinksDiv);

    // startButton.innerText = 'Restart'
    // startButton.classList.remove('hide')
    restartBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')

  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
function scoreTotals() {
    if (score == 20) {
        // classical music and merlot
    }else if(score == 40){
        // jazz and
    }else if(score == 60){
        // rock and whiskey sour
    }else if (score == 80){
        // hip and and margarita
    }else if(score == 100){
        // edm and vodka redbull
    }else if (score == 0){
      // you are lonely!
    }
}

const questions = [
  {
    question: 'Do you feel like dancing or chilling on your couch like a potato?',
    answers: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ]
  },
  {
    question: 'How do you like to spend your days off of work?',
    answers: [
      { text: 'Sleeping all day', correct: false },
      { text: 'Drinking with friends', correct: true },
      { text: 'Reading', correct: false},
      { text: 'Exercising', correct: false }
    ]
  },
  {
    question: 'Do you like to dance when no one is watching?',
    answers: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ]
  },
  {
    question: 'How would your friends describe you?',
    answers: [
      { text: 'Caring', correct: false },
      { text: 'Loyal', correct: false },
       { text: 'Spontaneous', correct: true },
      { text: 'I have no friends', correct: false }
    ]
  },
  {
    question: 'Are you spending the night alone?',
    answers: [
      { text: 'Yes', correct: false },
      { text: 'With my wild best friend', correct: true },
       { text: 'With a date', correct: false },
      { text: 'With my dog', correct: false },
    ]
  }
]



function reStart() {

	location.reload();
}
