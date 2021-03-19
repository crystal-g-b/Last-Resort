const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const intro = document.querySelector("#intro");
const introP = document.querySelector("#intro-p");
const pSection = document.querySelector(".paragraph-section");
const controls = document.querySelector(".controls");
let drinkName; 
let musicName;
let musicPlaylist;
let center = document.querySelector(".center-content");
let results = document.querySelector("#results-section");
let restartBtn = document.querySelector("#restart-btn");
let image;
// const resultsSection = document.querySelector("#results");
let score = 0;
let shuffledQuestions, currentQuestionIndex;

// start button to trigger startGame function
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
restartBtn.addEventListener('click', reStart)
// startGame function to start questions
function startGame() {
  startButton.classList.add('hide');
    console.log("the game has begun!");
    intro.classList.add("hide");
    introP.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
// showQuestion function which shows questions
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text;
    button.classList.add("btn","button", "is-link", "is-focused");
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
// function to select answer and loop through each button
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
    console.log("end")
    scoreTotals();
    restartBtn.classList.remove("hide");
  }
}
// function to add add audio - this will be incorporated into the project in the future
// function addAudio(sourceUrl) {
// 	var audio = document.createElement('audio');
//   var source = document.createElement('source');
//   audio.controls = 'true';
//   source.src = sourceUrl;
//   source.type = 'audio/mpeg';
//   audio.appendChild(source);
//   center.appendChild(audio);
//   audio.play();
// }
// function to render results
function renderResults(drinkName, image){
    questionContainerElement.classList.add('hide');
    newDiv = document.createElement('div');
    newDiv.classList = "results-section";
    controls.appendChild(newDiv);
    newP = document.createElement("p");
    newP.id = "results";
    newP.innerText = "Thank you for playing! Your music and drink recommendations are below!";
    newDiv.appendChild(newP);
    musicDiv = document.createElement("p");
    musicDiv.id = "music";
    drinksDiv = document.createElement("div");
    drinksPtag = document.createElement("p");
    // musicDiv.innerText = 'music maybe';
    drinksPtag.innerText = "Drink: " + drinkName;
    imageTag = document.createElement("img")
    imageTag.src = image
    // center.appendChild(newP);
    center.appendChild(musicDiv);
    center.appendChild(drinksDiv).appendChild(drinksPtag);
    center.appendChild(drinksDiv).appendChild(imageTag).classList.add('drinks');

}
// function to render results of music
function renderResultsMusic(musicLink, musicName){
  musicDiv = document.createElement("div");
  musicLinkName = document.createElement("p");
  musicLink.innerText = musicLink;
  musicPtag = document.createElement("p");
  musicPtag.innerText = "Song: " + musicName;
  // center.appendChild(musicDiv).appendChild(musicLink)
  center.appendChild(musicDiv).appendChild(musicPtag);
  // addAudio();
  return musicName;
}
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
// function to fetch api based on score total
function scoreTotals() {
  var drinkUrl;
  var musicUrl;
  switch(score) {
    case 20:
      drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=wine_cooler';
      musicUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=b55d513b5fa7b2b04f1b875994dd8041&page=1&page_size=1&f_music_genre_id=5";
      console.log("Drink Wine Cooler");
      console.log("The Lord of Abyss");
      break;
    case 40:
      drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin_fizz';
      musicUrl = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=b55d513b5fa7b2b04f1b875994dd8041&page=1&page_size=1&f_music_genre_id=1114';
      console.log("Drink Gin Fizz");
      console.log("Trade Winds");
      break;
    case 60:
      drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=whiskey_sour';
      musicUrl = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=b55d513b5fa7b2b04f1b875994dd8041&page=1&page_size=1&f_music_genre_id=21';
      console.log("Drink Whiskey Sour");
      console.log("Watch The Rebellion");
      break;
    case 80:
      drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
      musicUrl = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=b55d513b5fa7b2b04f1b875994dd8041&page=1&page_size=1&f_music_genre_id=1073';
      console.log("Drink Margarita");
      console.log("13.10.90");
      break;
    default:
      drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=long_island_iced_tea';
      musicUrl = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=b55d513b5fa7b2b04f1b875994dd8041&page=1&page_size=1&f_music_genre_id=7';
      console.log("Drink Long Island");
      console.log("I Will Break You");
      break;
  }

  fetch(drinkUrl)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        image = data.drinks[0].strDrinkThumb;
        drinkName = data.drinks[0].strDrink;
        console.log(data.drinks[0].strDrink);
        console.log(image, drinkName);
        renderResults(drinkName, image);
  
    });

  fetch(musicUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(data){
      console.log(data);
      musicName = data.message.body.track_list[0].track.track_name;
      var musicLink = data.message.body.track_list[0].track.track_share_url;
      // this will play the specific song on screen- this will be added into the project in the future
      // var musicId = data.message.body.track_list[0].track.commontrack_id;
      // fetch('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?apikey=b55d513b5fa7b2b04f1b875994dd8041&commontrack_id=' + musicId)
      // .then(function(response) {
      //   response.json();
      // })
      // .then(function(data) {
      //   console.log(data);
      //   console.log(data.message.body);
      //   // addAudio(data.message.body.track);
      // });
      musicName.innerText = data.message.body.track_list[0].track.track_name
      console.log(musicName, musicLink);
      renderResultsMusic(musicLink, musicName);
      storageLocal (musicName, drinkName)
    });

  
    
  
}

function storageLocal (musicName, drinkName) {
  console.log(musicName)
  console.log(drinkName)

  localStorage.setItem(musicName, drinkName)
}

// questions being asked in the app
const questions = [
  {
    question: 'What is the highlight of your week?',
    answers: [
      { text: 'Brunch with my friends', correct: true },
      { text: 'Sleeping on extra five minutes after I press the snooze button', correct: false },
        { text: 'Watching tv at night', correct: false },
      { text: 'Walking around the neighborhood', correct: false }
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
    question: 'What are your plans for tonight?',
    answers: [
      { text: 'Learning a new language', correct: false },
      { text: 'Eating pizza with my best friend', correct: true },
       { text: 'Going on a date', correct: false },
      { text: 'Playing with my dog', correct: false },
    ]
  }
]
// function to reload the page upon pressing the restart button
function reStart() {
	location.reload();
}
