import createArrayOfRandomCards from "./cards.js";
document.addEventListener("DOMContentLoaded", getUserAndOptionsFromSessionStorage);

document.querySelector("#btn-start-game").addEventListener("click", startGame);

async function getUserAndOptionsFromSessionStorage() {
	const optionsAndUser = JSON.parse(window.sessionStorage.getItem("userAndCardsQuantity"));
	return optionsAndUser;
}

const card = document.querySelectorAll(".card-game");
card.forEach((e) => e.addEventListener("click", flipCard));

function flipCard() {
	this.classList.toggle("flipCard"); //card clicado
}

function createCard(card) {
	const cardElement = document.createElement("div");
	cardElement.classList.add("card-game");

	const cardFront = document.createElement("div");
	cardFront.classList.add("card-front");

	const cardBack = document.createElement("div");
	cardFront.classList.add("card-back");

	cardElement.appendChild(cardFront);
	cardElement.appendChild(cardBack);
	cardElement.addEventListener("click", flipCard);
	return cardElement;
}

function renderCards(cards) {
	const boardGame = (document.querySelector(".board-game").innerHTML = "");
	cards.forEach((card) => {
		const cardElement = createCard(card);
		boardGame.appendChild(cardElement);
	});
}

async function startGame() {
	const user = await getUserAndOptionsFromSessionStorage();
	const cards = createArrayOfRandomCards(16);
	renderCards(cards);
}
