var OSName="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

console.log('Your OS: '+OSName);

// The above is to detect the operating system, in case I want to fix this issue with
// Windows (and possibly Mac?) rendering the page differently. It probably stems from the
// google font I'm using. 

let userChoice = document.querySelector(".input")
let choice = document.querySelector(".choice-declaration")

let landingScreen = document.querySelector(".landing-screen")
let landingImage = document.querySelector(".landing-image")
let fightButton = document.querySelector(".fight-button")
landingImage.src = "images/rps-circle-ezgif.gif"

let gameScreen = document.querySelector(".game-screen")
let container = document.querySelector(".container")
let playerChoiceImage = document.querySelector(".player-choice-image")
let computerChoiceImage = document.querySelector(".computer-choice-image")

let computerOptions = ["rock", "paper", "scissors"]

let randomValue = (length) => Math.floor(Math.random() * length)
let computerChooser = () => computerOptions[randomValue(3)]
let c
let numberOfRounds = 5

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

function userChoiceVisualizer() {
	if (userChoice.value == "rock") {
		landingImage.src = uVisualizerRandomizer("rock") 
	} else if (userChoice.value == "paper") {
		landingImage.src = uVisualizerRandomizer("paper") 
	} else if (userChoice.value == "scissors") {
		landingImage.src = uVisualizerRandomizer("scissors") 
	}
}

function uVisualizerRandomizer(type) {
	let choicesR = ["images/b1p-rock.png", "images/b2p-rock.png"]
	let choicesP = ["images/b1p-paper.png", "images/b2p-paper.png"]
	let choicesS = ["images/b1p-scissors.png", "images/b2p-scissors.png"]
	let decision

	if (type == "rock") {
		decision = choicesR[randomValue(2)]
	} else if (type == "paper") {
		decision = choicesP[randomValue(2)]
	} else if (type == "scissors") {
		decision = choicesS[randomValue(2)]
	}

	return decision
}

let screenState = "landing-screen"
function screenSelector() {
	if (screenState == "landing-screen"){
		landingScreen.style.display = "none"
		gameScreen.style.display = "flex";
		container.style.maxWidth = "1000px";
		screenState = "game-screen"
	} else if (screenState == "game-screen") {
		landingScreen.style.display = "block"
		gameScreen.style.display = "none";
		screenState = "landing-screen"
	}
}

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
	let result = []
	for (i = 0; i < numberOfRounds; i ++) {
		console.log("Round " + (i+ 1) + ": " + game())
	}
}


