import createArrayOfRandomCards from "./cards.js";
document.addEventListener("DOMContentLoaded", getUserAndOptionsFromSessionStorage);

document.querySelector("#btn-start-game").addEventListener("click", startGame);
const user = getUserAndOptionsFromSessionStorage();
const cards = [];
let currentScore = 0;
let second = 0,
	minute = 0,
	hour = 0;
let cron;
const pointsToWin = user.cardsQuantity / 2;

function getUserAndOptionsFromSessionStorage() {
	const optionsAndUser = JSON.parse(window.sessionStorage.getItem("userAndCardsQuantity"));
	return optionsAndUser;
}

function onClickCard() {
	if (this.classList.contains("card-found") || this.classList.contains("active-card")) {
		return;
	}
	if (cards.length === 2) {
		return;
	}
	flipCard(this);
	const cardInformations = {
		person: this.lastChild.dataset.value,
		indexCard: this.id,
	};
	cards.push(cardInformations);
	if (cards.length === 2) {
		checkMatchingCards(cards);
	}
	if (currentScore == pointsToWin) {
		endGame();
	}
}

function flipCard(card) {
	card.classList.add("flipCard");
	card.classList.add("active-card");
}

function checkMatchingCards(cards) {
	if (cards[0].person === cards[1].person) {
		cardFound(cards);
	} else {
		cardNotFound(cards);
	}
}

function cardFound(arrayCards) {
	arrayCards.forEach((card) => {
		document.getElementById(card.indexCard).classList.add("card-found");
	});
	addPoint();
	cards.length = 0;
}
function cardNotFound(arrayCards) {
	setTimeout(() => {
		arrayCards.forEach((card) => {
			document.getElementById(card.indexCard).classList.remove("flipCard");
			document.getElementById(card.indexCard).classList.remove("active-card");
		});
		cards.length = 0;
	}, 1000);
}

function addPoint() {
	const pontuation = +document.querySelector("#span-pontuation").textContent;
	document.querySelector("#span-pontuation").textContent = pontuation + 1;
	currentScore++;
}

function createCard(card, indexCard) {
	const cardElement = document.createElement("div");
	const cardFront = createCardFront();
	const cardBack = createCardBack(card);
	cardElement.classList.add("card-game");
	cardElement.id = indexCard;
	cardElement.appendChild(cardFront);
	cardElement.appendChild(cardBack);
	cardElement.addEventListener("click", onClickCard);
	return cardElement;
}

function createCardFront() {
	const cardFront = document.createElement("div");
	cardFront.classList.add("card-front");
	const imageCardFront = document.createElement("img");
	imageCardFront.src = "../assets/images/logo.webp";
	imageCardFront.classList.add("img-cardFront");
	cardFront.appendChild(imageCardFront);
	return cardFront;
}
function createCardBack(card) {
	const cardBack = document.createElement("div");
	cardBack.classList.add("card-back");
	cardBack.dataset.value = card.value;
	cardBack.innerText = card.value;
	cardBack.style.backgroundImage = `url('${card.imageSrc}')`
	return cardBack;
}
function renderCards(cards) {
	const boardGame = document.querySelector(".board-game");
	boardGame.innerHTML = "";
	cards.forEach((card, index) => {
		const cardElement = createCard(card, index);
		boardGame.appendChild(cardElement);
	});
}

function startTimer() {
	cron = setInterval(() => {
		timer();
	}, 1000);
}

function resetTimer() {
	document.getElementById("hour").innerText = "00";
	document.getElementById("minute").innerText = "00";
	document.getElementById("second").innerText = "00";
	second = 0;
	minute = 0;
	hour = 0;
	clearInterval(cron);
}
function timer() {
	if ((second += 1) == 60) {
		second = 0;
		minute++;
	}
	if (minute == 60) {
		minute = 0;
		hour++;
	}

	document.getElementById("hour").innerText = hour >= 10 ? hour : `0${hour}`;
	document.getElementById("minute").innerText = minute >= 10 ? minute : `0${minute}`;
	document.getElementById("second").innerText = second >= 10 ? second : `0${second}`;
}
function pauseTimer() {
	clearInterval(cron);
}

function populatePointsAndTimerEndGame() {
	document.querySelector("#span-pontuation-endgame").textContent = currentScore > 10 ? currentScore : `0${currentScore}`;
	const timer = getTimer();
	document.querySelector("#span-time-endgame").innerHTML = timer;
}
function getTimer() {
	let hour = document.getElementById("hour").innerText;
	let minute = document.getElementById("minute").innerText;
	let second = document.getElementById("second").innerText;
	return `${hour}:${minute}:${second}`;
}

function createUserAndScoreToPost() {
	const pontuation = document.querySelector("#span-pontuation").textContent;
	const time = getTimer();
	const dateGame = new Date().toISOString().slice(0, 10);
	const newUser = {
		userName: user.user,
		score: +pontuation,
		cardsQuantity: +user.cardsQuantity,
		gameTime: time,
		gameDate: dateGame,
	};
	return newUser;
}
async function postScoreAndUser() {
	const urlPost = "https://localhost:7270/addScore";
	const userAndScore = createUserAndScoreToPost();
	try {
		const response = await fetch(urlPost, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userAndScore),
		});
		if (!response.ok) {
			throw new Error(`Erro ao salvar os dados - Status:${response.status}
				${response.statusText}`);
		}
	} catch (error) {
		throw error;
	}
}
function resetGame() {
	resetTimer();
	clearInterval(cron);
	currentScore = 0;
	document.querySelector("#span-pontuation").textContent = 0;
}

function startGame() {
	resetGame();
	const cards = createArrayOfRandomCards(user.cardsQuantity);
	renderCards(cards);
	startTimer();
	document.querySelector("#btn-start-game").textContent = "Reiniciar jogo";
}

async function endGame() {
	pauseTimer();
	populatePointsAndTimerEndGame();
	try {
		await postScoreAndUser();
	} catch (error) {
		const spanError = document.querySelector("#span-error");
		spanError.textContent = `Erro: ${error.message}`;
		spanError.classList.remove("hidden");
	}
	document.querySelector("#overlay-endgame").classList.remove("hidden");
}
