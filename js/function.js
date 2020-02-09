var randomNumber = Math.floor(Math.random() * 99) + 1;

var guesses = document.querySelector('#guesses');
var lastResult = document.querySelector('#lastResult');
var lowOrHi = document.querySelector('#lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var resetButton = document.querySelector('#reset');
resetButton.style.display = 'none';
guessField.focus();

var gamesWon = 0;
var gamesLost = 0;
var gameResults = document.querySelector('#gameResults');
gameResults.innerHTML = ' ';

function checkGuess(){
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
	guesses.innHTML = 'Previous guesses: ';
    }

    if (isNaN(userGuess)) {
	lastResult.innerHTML = 'Not a number!';
    }
    else if (userGuess > 99) {
	lastResult.innerHTML = 'Out of range!';
    }
    else {
	guessCount++;
	guesses.innerHTML += userGuess + ' ';
	if (userGuess === randomNumber) {
	    lastResult.innerHTML = 'Congratulations! You got it right!';
	    lastResult.style.backgroundColor = 'green';
	    lowOrHi.innerHTML = '';
	    gamesWon++;
	    setGameOver();
	} else if (guessCount === 7) {
	    lastResult.innerHTML = 'Sorry, you lost!';
	    gamesLost++;
	    setGameOver();
	} else {
	    lastResult.innerHTML = 'Wrong!';
	    lastResult.style.backgroundColor = 'red';
	    if(userGuess < randomNumber) {
		lowOrHi.innerHTML = 'Last guess was too low!';
	    } else if (userGuess > randomNumber) {
		lowOrHi.innerHTML = 'Last guess was too high!';
	    }
	}
    }
    
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.style.display = 'inline';
    resetButton.addEventListener('click', resetGame);
    gameResults.innerHTML = 'Won:' + gamesWon + ' Lost:' + gamesLost;
}

function resetGame() {
    guessCount = 1;
    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i =0; i < resetParas.length; i++){
	resetParas[i].textContent = '';
    }
    
    resetButton.style.display = 'none';
    
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    lastResult.style.backgroundColor = 'white';
    
    randomNumber = Math.floor(Math.random() * 99) + 1;
}
