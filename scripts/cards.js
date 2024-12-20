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
function createArrayCards(numberOfCards) {
	const cardsRondomized = cards.sort(() => Math.random() - 0.5);
	const arrayCards = [];
	numberOfCards = numberOfCards / 2;
	for (let i = 0; i < numberOfCards; i++) {
		arrayCards.push(cardsRondomized[i]);
		arrayCards.push(cardsRondomized[i]);
	}
	return arrayCards;
}
function shuffleArrayCards(arrayCards) {
	for (let i = arrayCards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arrayCards[i], arrayCards[j]] = [arrayCards[j], arrayCards[i]];
	}
	return arrayCards;
}

export default function createRandonArrayCards(numberOfCards) {
	const arrayCards = createArrayCards(numberOfCards);
	const arrayCardsRondomized = shuffleArrayCards(arrayCards);
	return arrayCardsRondomized;
}
