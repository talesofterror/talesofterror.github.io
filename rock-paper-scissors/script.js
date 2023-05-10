
let userChoice = document.querySelector(".input")
let choice = document.querySelector(".choice-declaration")

let landingScreen = document.querySelector(".landing-screen")
let landingImage = document.querySelector(".landing-image")
let fightButton = document.querySelector(".fight-button")
landingImage.src = "images/rps-circle-ezgif.gif"

let container = document.querySelector(".container")
let gameScreen = document.querySelector(".game-screen")

let computerOptions = ["rock", "paper", "scissors"]

let randomValue = (length) => Math.floor(Math.random() * length)
let computerChooser = () => computerOptions[randomValue(3)]
let c
let numberOfRounds = 5

let arrayTest = new Array(numberOfRounds)

function arrayTestDo() {
	for (i = 0; i < arrayTest.length; i++) {
		arrayTest[i] = "array index " + i
		console.log(arrayTest[i])
	}
}


// EVENT LISTENER

addEventListener ("change", 
() => {

userChooser()

})

// DESIGN FUNCTIONS
// It's kind of extra, but now I've got the idea in my head that I should make
// a little arm icon for the title section that changes based on what you pick.
// It could start with an arm curled up in a flex pose, then "shoot" based on
// userChoice.value

function userChooser () {

	if (userChoice.value == "default") {
		fightButton.style.display = "none"
		choice.style.display ="none"
		landingImage.src = "images/rps-circle-ezgif.gif"
	} 
	else if (userChoice.value != "default") {
		fightButton.style.display = "block"
		choice.textContent = `You chose ${userChoice.value}`
		choice.style.display = "block"
		userChoiceVisualizer()
		game()
	}
}

let userChoiceString
function userChoiceVisualizer() {
	if (userChoice.value == "rock") {
		landingImage.src = visualizerRandomizer(userChoice.value) 
	} else if (userChoice.value == "paper") {
		landingImage.src = visualizerRandomizer(userChoice.value) 
	} else if (userChoice.value == "scissors") {
		landingImage.src = visualizerRandomizer(userChoice.value) 
	} 
}

function visualizerRandomizer(type) {
	let playerRock = ["images/b1p-rock.png", "images/b2p-rock.png"]
	let playerPaper = ["images/b1p-paper.png", "images/b2p-paper.png"]
	let playerScissors = ["images/b1p-scissors.png", "images/b2p-scissors.png"]
	let decision

	if (type == "rock") {
		decision = playerRock[randomValue(2)]
	} else if (type == "paper") {
		decision = playerPaper[randomValue(2)]
	} else if (type == "scissors") {
		decision = playerScissors[randomValue(2)]
	}

	userChoiceString = decision

	return decision
}

// GAME STATE

function screenSelector() {
	if (screenState == "landing-screen"){
		landingScreen.style.display = "none"
		gameScreen.style.display = "flex";
		container.style.maxWidth = "1000px";
		playerChoiceImage.src = userChoiceString;
		startGame();
		screenState = "game-screen"
	} else if (screenState == "game-screen") {
		landingScreen.style.display = "block"
		gameScreen.style.display = "none";
		gameTextBox.style.height = "5px";
		gameTextBox.style.marginTop = "30.5%"
		resetGame()
		screenState = "landing-screen"
	}
}

// GAME SCREEN

/*
need to access: 
	- player-box.image
	- computer-box.image
	- game-text.round-container (for fight announcement and game rounds)
*/

let roundContainer = document.querySelector(".round-container")
let gameTextBox = document.querySelector(".game-text")
let playerChoiceImage = document.querySelector(".player-choice-image")
let computerChoiceImage = document.querySelector(".computer-choice-image")
let computerBox = document.querySelector(".computer-box")
let screenState = "landing-screen"

let qMarksContainer = document.createElement("div")
let qmarks = document.createElement("div")
qMarksContainer.classList.add("qmarks-container")
qmarks.classList.add("qmarks")
qmarks.textContent = "???"
computerBox.insertBefore(qMarksContainer, computerChoiceImage)
qMarksContainer.appendChild(qmarks)
let endPiece = roundContainer.lastElementChild

let countdownContainer = document.createElement("div")
countdownContainer.classList.add("countdown")
roundContainer.insertBefore(countdownContainer, endPiece)

let t_OpeningOffset = 100

function startGame () {
	setTimeout(()=>{
		gameTextBox.style.height = "400px";
		gameTextBox.style.marginTop = "7%"
		countDown()
	}, t_OpeningOffset)
}

let t_interval = 500
function countDown() {

	for (i = 1; i <= 4; i++){
		countDownTimeout(i)
	}

	function countDownTimeout(i) {
		if (i == 4){
			setTimeout(() => {
				countdownContainer.textContent = "FIGHT!"
				startRounds()
			}, t_OpeningOffset + t_interval * i)
		} else {
			i == 1 ? 
			setTimeout(() => {
				countdownContainer.textContent = i
			}, t_OpeningOffset + t_interval - 100)
			: setTimeout(() => {
				countdownContainer.textContent = i
			  }, t_OpeningOffset + t_interval * i)
		}
	}
}

let stage = document.createElement("div")
stage.id = "stage"
function startRounds() {
	roundContainer.insertBefore(stage, endPiece)

	clearArea()
	displayRounds()
	
	function clearArea() {
		setTimeout(()=>{
			countdownContainer.remove()
		}, t_OpeningOffset + t_interval)
	}

	function displayRounds() {
		for (i = 1; i <= numberOfRounds; i++){
			roundsTimeout(i)
		}
		function roundsTimeout(i) {
			setTimeout(()=> {
				let r_Text = document.createElement("div")
				r_Text.classList.add("round-text")
				stage.appendChild(r_Text)
				r_Text.textContent = i
			}, t_OpeningOffset + 200 + t_interval * i)
		}
	}
}

function resetGame() {
	let target = roundContainer.children[1]
	roundContainer.removeChild(target)
	clearInterval()
}

/* 
onClick FIGHT: 
	- countdown 3, 2, 1
		- second * 1000 + timerOffsetStart
			3: 
	- display "FIGHT!"
	- display rounds
		- one at a time

psuedo: 
	for (i = 0; i < numberOfRounds; i++) {
		timeoutFunction()
		})
	}

	function timeoutFunction() {
		setTimeout( ()=> {
			makeDiv(), 
			timerOffsetScroll + (interval * i)
		})
	}
*/

// GAME FUNCTIONS

function game() {
	let result
	c = computerChooser()
	if (userChoice.value == c) {
		result = "Tie!"
	} else if (userChoice.value == "rock" && c == "paper") {
		result = "You lose"
	} else if (userChoice.value == "rock" && c == "scissors") {
		result = "You win!"
	} else if (userChoice.value == "paper" && c == "rock") {
		result = "You win!" 
	} else if (userChoice.value == "paper" && c == "scissors") {
		result = "You lose!"
	} else if (userChoice.value == "scissors" && c == "rock") {
		result = "You lose!" 
	} else if (userChoice.value == "scissors" && c == "paper") {
		result = "You win!"
	} else if (userChoice.value == "default") {
		result = "You must choose rock, paper, or scissors!"
	}

	return result
}

function rounds () {
	let result = [numberOfRounds]
	for (i = 0; i < numberOfRounds; i ++) {
		console.log("Round " + (i+ 1) + ": " + game())
	}
}

// WINDOWS COMPATABILITY

var OSName="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

console.log('Your OS: '+OSName);

if (OSName=="Windows") {
	let titleElement = document.querySelector(".title")
	let fightButton = document.querySelector(".fight-button")

	titleElement.style.paddingBottom = "5px"
	fightButton.style.paddingBottom = "5px"
}


