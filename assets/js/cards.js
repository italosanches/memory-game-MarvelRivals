const cards = [
	{ value: "Thor", image: "" },
	{ value: "Loki", image: "" },
	{ value: "Iron First", image: "" },
	{ value: "Jeff", image: "" },
	{ value: "Doctor Strange", image: "" },
	{ value: "Punisher", image: "" },
	{ value: "Hulk", image: "" },
	{ value: "Spider Man", image: "" },
	{ value: "Venon", image: "" },
	{ value: "Wolverine", image: "" },
];
document.querySelector("#x").addEventListener("click", function () {
	createArrayOfRandomCards(10);
});
function createArrayOfRandomCards() {
	const cardsRondomized = cards.sort(() => Math.random() - 0.5);
	const arrayCards = [];
	console.log(numberOfCards);
	numberOfCards = numberOfCards / 2;
	for (let i = 0; i < numberOfCards; i++) {
		arrayCards.push(cardsRondomized[i]);
	}
	console.log(arrayCards);
}
