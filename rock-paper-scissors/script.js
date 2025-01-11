
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

// EVENT LISTENER

userChoice.addEventListener ("change", 
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
		landingImage.src = visualizerRandomizer(userChoice.value) 
	} else if (userChoice.value == "paper") {
		landingImage.src = visualizerRandomizer(userChoice.value) 
	} else if (userChoice.value == "scissors") {
		landingImage.src = visualizerRandomizer(userChoice.value) 
	} 
}

function visualizerRandomizer(type) {
	let playerRock = ["images/b1p-r.png", "images/b2p-r.png"]
	let playerPaper = ["images/b1p-p.png", "images/b2p-p.png"]
	let playerScissors = ["images/b1p-s.png", "images/b2p-s.png"]
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

let roundContainer = document.querySelector(".round-container")
let gameTextBox = document.querySelector(".game-text")
let playerChoiceImage = document.querySelector(".player-choice-image")
let computerChoiceImage = document.querySelector(".computer-choice-image")
let computerChoiceString
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
	
	// timeouts

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
	let countdownContainer = document.createElement("div")
	countdownContainer.classList.add("countdown")
	roundContainer.insertBefore(countdownContainer, roundContainer.children[1])

	for (i = 1; i <= 4; i++){
		countDownTimeout(i)
	}

	function countDownTimeout(i) {
		if (i == 4){
			setTimeout(() => {
				countdownContainer.textContent = "FIGHT!"
				console.log("...FIGHT!")
				startRounds()

			}, t_OpeningOffset + t_interval * i)
		} else {
			i == 1 ? 
			setTimeout(() => {
				countdownContainer.textContent = i
				console.log(i + "...")
			}, t_OpeningOffset + t_interval - 100)
			: setTimeout(() => {
				countdownContainer.textContent = i
				console.log(i + "...")
			  }, t_OpeningOffset + t_interval * i)
		}
	}
}

let tallyCalculated = [0, 0]
function startRounds() {
	let stage = document.createElement("div")
	let tallyHolster = []
	stage.id = "stage"
	
	function roundMaker (parent, i) {
		let roundPlayerImg = document.createElement("div")
		let roundComputerImg = document.createElement("div")
		let roundNumber = document.createElement("div")
		roundPlayerImg.classList.add("round-img")
		roundNumber.classList.add("round-number")
		roundComputerImg.classList.add("round-img")
		parent.appendChild(roundPlayerImg)
		parent.appendChild(roundNumber)
		parent.appendChild(roundComputerImg)
		roundNumber.textContent = "Round " + i
		roundPlayerImg.innerHTML = `<img src="images/${iconizer("user")}">`
		roundComputerImg.innerHTML = `<img src="images/${iconizer("not the user")}">`
	}

	function computerChoiceVisualizer (c) {
		let computerRock = ["images/b1c-r.png", "images/b2c-r.png"]
		let computerPaper = ["images/b1c-p.png", "images/b2c-p.png"]
		let computerScissors = ["images/b1c-s.png", "images/b2c-s.png"]

		if (c == "rock") {
			if (userChoiceString[8] == 2){
				computerChoiceString = computerRock[0]
			} else {
				computerChoiceString = computerRock[1]
			}
		} else if (c == "paper") {
			if (userChoiceString[8] == 2){
				computerChoiceString = computerPaper[0]
			} else {
				computerChoiceString = computerPaper[1]
			}
		} else {
			if (userChoiceString[8] == 2){
				computerChoiceString = computerScissors[0]
			} else {
				computerChoiceString = computerScissors[1]
			}
		}

		return computerChoiceString
	}

	function iconizer (belligerent) {
		if (belligerent == "user"){
			if (userChoiceString[11] == "r") {
				return "rock-sm.png"
			} else if (userChoiceString[11] == "p") {
				return "paper-sm.png"
			} else {
				return "scissors-sm.png"
			}
		} else {
			if (computerChoiceString[11] == "r") {
				return "rock-sm.png"
			} else if (computerChoiceString[11] == "p") {
				return "paper-sm.png"
			} else {
				return "scissors-sm.png"
			}
		}
	}

	
	clearArea()
	displayRounds()
	
	function clearArea() {
		setTimeout(()=>{
			roundContainer.children[1].remove()
			roundContainer.insertBefore(stage, endPiece)
			// countdownContainer.remove()
		}, t_OpeningOffset + t_interval)
	}

	function displayRounds() {

		let gameInst = []
		let resultArray = []

		setTimeout (() => {
			qmarks.textContent = ""
			roundContainer.style.backgroundImage = "url('images/roundtext.bg.gif')"
			roundContainer.style.backgroundColor = "var(--accentColor)"
		}, t_OpeningOffset + 200 + t_interval)

		for (i = 1; i <= numberOfRounds; i++){
			roundsTimeout(i)
			roundSizeTimeout(i)
			roundsResultsTimeout(i)
			if (i == numberOfRounds){
				displayWinner()
			}
		}
		
		function roundsTimeout(i) {
			setTimeout(()=> {
				let r_Text = document.createElement("div")
				r_Text.classList.add("round-text")
				stage.appendChild(r_Text)
				gameInst = game()
				resultArray[i] = gameInst[2]
				computerChoiceImage.src = computerChoiceVisualizer(gameInst[1])
				tallyHolster[i-1] = gameInst[2]
				tallyCounter(i)
				roundMaker(r_Text, i)
				consoleText()
			}, t_OpeningOffset + 200 + t_interval * i)
			
			function consoleText() {
				console.log("** ROUND " + i + " **")
				console.log("user choice = " + gameInst[0])
				console.log("computer choice = " + gameInst[1])
				console.log("Result = " + gameInst[2])
			}
		}

		function roundSizeTimeout (i) {
			setTimeout(() => {
				document.querySelectorAll(".round-text")
					.forEach(element => element.style.fontSize = "1em")
			}, t_OpeningOffset + 500 + t_interval * i)
		}

		function roundsResultsTimeout (i) {
			setTimeout(() => {
					stage.children[i-1].style.fontSize = "1.3em"
					stage.children[i-1].children[1].textContent = resultArray[i]
					if (resultArray[i] == "You win!") {
						stage.children[i-1].children[1].style.WebkitTextStroke 
							= "1px white"
					} else if (resultArray[i] == "You lose!") {
						stage.children[i-1].children[1].style.WebkitTextStroke 
							= "1px var(--accentColor)"
						} else {
						stage.children[i-1].children[1].style.WebkitTextStroke 
							= "1px grey"
					}
					shrink(i)
			}, t_OpeningOffset + 3000 + t_interval * i)
			
			function shrink (i) {
				setTimeout(() => {
					stage.children[i-1].style.fontSize = "1em"						
				}, 120)	

			}
		}
	}

	function tallyCounter (i) {
		if (tallyHolster[i-1] == "You win!") {
			tallyCalculated[0]++
		} else if (tallyHolster[i-1] == "You lose!") {
			tallyCalculated[1]++
		} else {}
	}
}

function tallyAnalyser() {
	let result

	if (tallyCalculated[0] > tallyCalculated[1]) {
		result = "player"
	} else if (tallyCalculated[1] > tallyCalculated[0]) {
		result = "computer"
	} else {
		result = "tie"
	}

	return result
}

titleContainer = document.querySelector(".title-container")
function displayWinner () {
	
	let resetLink = document.createElement("a")
	resetLink.setAttribute('onclick', "location.reload()")
	let resetButton = document.querySelector(".reset-button")
	let resetButtonImg = document.createElement("img")
	resetButtonImg.src = "images/refresh.png"

	setTimeout(() => {
		let winner = document.createElement("div")
		winner.classList.add("winner")
		let winnerImg = document.createElement("img")
		if (tallyAnalyser() == "player") {
			winnerImg.src = "images/bx-trophy.svg"
		} else if (tallyAnalyser() == "computer"){
			winnerImg.src = "images/bxs-hand-up.svg"
		} else {
			winnerImg.src = "images/bxs-shield-minus.svg"
		}
		winner.appendChild(winnerImg)
		stage.appendChild(winner)
		resetButton.appendChild(resetLink)
		resetLink.appendChild(resetButtonImg)
	}, t_OpeningOffset + 5700 + t_interval)
}

function resetGame() {
	stage.remove()
	userChoice.value = "default"
	landingImage.src = "images/rps-circle-ezgif.gif"
	computerChoiceImage.src = "images/question-marks.2.png"
	fightButton.style.display = "none"
	choice.style.display ="none"
	qmarks.textContent = "???"
	roundContainer.style.backgroundImage = "url('images/gametext.bg.r.fs.gif')"
	tallyCalculated = tallyCalculated.map(i => 0)
	titleContainer.children[1].children[0].remove();
	clearInterval()
}


// GAME FUNCTIONS

function game() {
	let outcome = []
	c = computerChooser()
	let result
	if (userChoice.value == c) {
		result = "Tie!"
	} else if (userChoice.value == "rock" && c == "paper") {
		result = "You lose!"
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

	outcome[0] = userChoice.value
	outcome[1] = c
	outcome[2] = result

	return outcome
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


