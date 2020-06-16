const artikels = document.querySelectorAll('.artikel');
const nounObj = nouns;
const nounArray = Object.keys(nounObj).map(key => nounObj[key]);
let gameData = {
  correct: [],
  score: 0,
  currentNoun: {
    deutsch: '',
    englisch: '',
    artikel: ''
  }
}

resetGame();
addEventListeners();

function resetGame() {
  updateScore('reset');
  updateCorrectList('reset');
  let nounNumber = randomNumber();
  updateNoun(nounNumber);
  updateDom();
}

function updateCorrectList(position) {
  if (position === 'reset') {
    gameData.correct = [];
  }else {
    gameData.correct.push(position);
  }
}

function updateNoun(nounNumber) {
  newNoun = nounArray[nounNumber];
  gameData.currentNoun.deutsch = newNoun.deutsch;
  gameData.currentNoun.englisch = newNoun.englisch;
  gameData.currentNoun.artikel = newNoun.artikel;
}

function checkArtikel(artikel) {
  let result = artikel === gameData.currentNoun.artikel ? true : false;
  return result;
}

function randomNumber() {
  return Math.floor(Math.random() * Math.floor(nounArray.length));
}

function getUnusedRandomNumber () {
  var ranNum = randomNumber();
  for (let i; i > nounArray.length; i++) {
    if (gameData.correct.indexOf(ranNum) != -1 ) {
      continue;
    }else {
      break;
    }
  }
  return ranNum;
}

function updateScore(reset) {
  if (reset === 'reset') {
    gameData.score = 0;
  } else {
    gameData.score++;
  }
}

function updateNoun () {
  let nounNum = getUnusedRandomNumber();
  let nounObj = nounArray[nounNum];
  nounObj.deutsch = nounObj.deutsch.charAt(0).toUpperCase() + nounObj.deutsch.slice(1);
  gameData.currentNoun.deutsch = nounObj.deutsch;
  gameData.currentNoun.englisch = nounObj.englisch;
  gameData.currentNoun.artikel = nounObj.artikel;
}

function success() {
  showSuccessState();
  updateScore();
  updateCorrectList();
  updateNoun();
  updateDom();
}

function fail() {
  showFailState();
  resetGame();
}

function checkSubmission () {
  let artikelChoice = this.getAttribute('data-artikel');
  let result = checkArtikel(artikelChoice);
  if (result) {
    success();
  } else {
    fail();
  }
  showDetails();
}

function showDetails() {
  let artikel = document.getElementById('artikel');
  let englisch = document.getElementById('englisch');
  artikel.classList.add('show');
  englisch.classList.add('show');
  setTimeout(function() {
    artikel.classList.remove('show');
    englisch.classList.remove('show');
  },2000);

}

function showSuccessState() {
  let wordBox = document.getElementById('wordBox');
  wordBox.classList.add('success');
  setTimeout(function() {
    wordBox.classList.remove('success');
  }, 2000);
}

function showFailState() {
  let wordBox = document.getElementById('wordBox');
  wordBox.classList.add('fail');
  setTimeout(function() {
    wordBox.classList.remove('fail');
  }, 2000);
}

function updateDom () {
  let score = document.getElementById('score');
  let word = document.getElementById('word');
  let englisch = document.getElementById('englisch');
  let artikel = document.getElementById('artikel');
  setTimeout(function() {
    score.innerHTML = gameData.score;
    word.innerHTML = gameData.currentNoun.deutsch;
    englisch.innerHTML = gameData.currentNoun.englisch;
    artikel.innerHTML = gameData.currentNoun.artikel;
  }, 2000);
  // score.innerHTML = gameData.score;
  // word.innerHTML = gameData.currentNoun.deutsch;
  // englisch.innerHTML = gameData.currentNoun.englisch;
  // artikel.innerHTML = gameData.currentNoun.artikel;
}

function addEventListeners() {
  artikels.forEach(item => {
    item.addEventListener('click', checkSubmission);
  });
}
