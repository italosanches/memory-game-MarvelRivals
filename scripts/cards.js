const cards = [
	{ value: "Thor", imageSrc: "../assets/images/persons-imgs/thor.png" },
	{ value: "Loki", imageSrc: "../assets/images/persons-imgs/loki.png" },
	{ value: "Iron Fist", imageSrc: "../assets/images/persons-imgs/ironfist.png" },
	{ value: "Jeff", imageSrc: "../assets/images/persons-imgs/jeff.png" },
	{ value: "Doctor Strange", imageSrc: "../assets/images/persons-imgs/drstrange.png" },
	{ value: "Punisher", imageSrc: "../assets/images/persons-imgs/punisher.png" },
	{ value: "Hulk", imageSrc: "../assets/images/persons-imgs/hulk.png" },
	{ value: "Spider Man", imageSrc: "../assets/images/persons-imgs/spider-man.png" },
	{ value: "Venon", imageSrc: "../assets/images/persons-imgs/venom.png" },
	{ value: "Wolverine", imageSrc: "../assets/images/persons-imgs/wolverine.png" },
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
