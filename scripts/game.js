import createArrayOfRandomCards from "./cards.js";
document.addEventListener("DOMContentLoaded", getUserAndOptionsFromSessionStorage);

async function getUserAndOptionsFromSessionStorage() {
	const optionsAndUser = JSON.parse(window.sessionStorage.getItem("userAndCardsQuantity"));
	const cards = createArrayOfRandomCards(optionsAndUser.cardsQuantity);
	console.log(cards);
}
