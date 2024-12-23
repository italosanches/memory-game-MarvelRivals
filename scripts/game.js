// import createArrayOfRandomCards from "./cards.js";
// document.addEventListener("DOMContentLoaded", getUserAndOptionsFromSessionStorage);

// async function getUserAndOptionsFromSessionStorage() {
// 	const optionsAndUser = JSON.parse(window.sessionStorage.getItem("userAndCardsQuantity"));
// 	const cards = createArrayOfRandomCards(optionsAndUser.cardsQuantity);
// 	console.log(cards);
// }

const card = document.querySelectorAll(".card-game");
card.forEach((e) => e.addEventListener("click", flipCard));

function flipCard() {
	this.classList.toggle("flipCard"); //card clicado
}
