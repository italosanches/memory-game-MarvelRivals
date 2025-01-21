// import { getUserAndOptionsFromSessionStorage } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
	const userAndCardsQuantity = getUserAndOptionsFromSessionStorage().cardsQuantity;
	createTableScore(userAndCardsQuantity);
});
const buttonsFilters = document.querySelectorAll(".button-score");
for (const button of buttonsFilters) {
	//
	button.addEventListener("click", async function () {
		console.log("Valor do botão clicado:", this.value);
		await createTableScore(this.value);
	});
}

function getUserAndOptionsFromSessionStorage() {
	const optionsAndUser = JSON.parse(window.sessionStorage.getItem("userAndCardsQuantity"));
	return optionsAndUser;
}
async function createTableScore(cardsQuantity) {
	const tableScore = document.querySelector("#table-score");
	const scoresFromUser = await getScores(cardsQuantity);
	const classifyScoresFromUsers = classifyRankingUsers(scoresFromUser);
	const tableRows = createRowsAndCellsToTable(classifyScoresFromUsers);
	clearScores();
	createHeaderToTable(tableScore);
	tableRows.forEach((e) => {
		tableScore.appendChild(e);
	});
}

function createHeaderToTable(tableScore) {
	const headerTable = document.createElement("div");
	const headerCell = ["Ranking", "Usuario", "Quantidade de Cartas", "Pontuação", "Tempo"];
	headerCell.forEach((cellName) => {
		const cell = document.createElement("div");
		cell.classList.add("table-cell");
		cell.textContent = cellName;
		headerTable.classList.add("table-row", "header");
		headerTable.appendChild(cell);
	});
	tableScore.appendChild(headerTable);
}

function createRowsAndCellsToTable(scoresFromUsers) {
	const rows = [];
	scoresFromUsers.forEach((userScore) => {
		const tableRow = document.createElement("div");
		tableRow.classList.add("table-row", "row-pontuation");
		const tableCell = populateCell(userScore);
		tableCell.forEach((cell) => {
			tableRow.appendChild(cell);
		});
		rows.push(tableRow);
	});
	return rows;
}

function classifyRankingUsers(scoresFromUser) {
	console.log(scoresFromUser);
	for (let i = 0; i < scoresFromUser.length; i++) {
		scoresFromUser[i].ranking = i + 1;
	}
	return scoresFromUser;
}

function populateCell(userScore) {
	const cells = [];
	const { cardsQuantity, gameDate, gameTime, userName, ranking } = userScore;
	const data = [ranking, userName, cardsQuantity, gameDate, gameTime];
	data.forEach((e) => {
		const tableCell = document.createElement("div");
		tableCell.classList.add("table-cell");
		tableCell.textContent = e;
		cells.push(tableCell);
	});
	return cells;
}
async function getScores(cardsQuantity) {
	const url = `https://localhost:7270/getScores?cardsQuantityes=${cardsQuantity}`;
	console.log(url);
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Erro ao fazer requisição ${response.statusText}`);
		}
		const responseJson = await response.json();
		console.log(await responseJson);
		return responseJson;
	} catch (error) {}
}

function clearScores() {
	// const rowsPontuation = document.querySelectorAll(".row-pontuation");
	// rowsPontuation.forEach((e) => {
	// 	e.innerHTML = "";
	// });
	const divTableScore = document.querySelector("#table-score");
	divTableScore.innerHTML = "";
}
