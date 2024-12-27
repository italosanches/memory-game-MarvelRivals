import createArrayOfRandomCards from "./cards.js";
document.addEventListener("DOMContentLoaded", getUserAndOptionsFromSessionStorage);
var cards = [];

document.querySelector("#btn-start-game").addEventListener("click", startGame);

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
}

function createCard(card, indexCard) {
	const cardElement = document.createElement("div");
	cardElement.classList.add("card-game");
	cardElement.id = indexCard;
	cardElement.classList.contains;
	const cardFront = document.createElement("div");
	cardFront.classList.add("card-front");

	const cardBack = document.createElement("div");
	cardBack.classList.add("card-back");
	cardBack.dataset.value = card.value;
	cardBack.innerText = card.value;
	cardElement.appendChild(cardFront);
	cardElement.appendChild(cardBack);
	cardElement.addEventListener("click", onClickCard);
	return cardElement;
}

function renderCards(cards) {
	const boardGame = document.querySelector(".board-game");
	boardGame.innerHTML = "";
	cards.forEach((card, index) => {
		const cardElement = createCard(card, index);
		boardGame.appendChild(cardElement);
	});
}

function startGame() {
	const user = getUserAndOptionsFromSessionStorage();
	const cards = createArrayOfRandomCards(user.cardsQuantity);
	renderCards(cards);
}
