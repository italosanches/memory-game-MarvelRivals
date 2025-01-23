document.querySelector("#btn-start-game").addEventListener("click", buttonNewGame);

function buttonNewGame(e) {
	e.preventDefault();
	const errorValidateInput = validateInputNick();
	if (!errorValidateInput) {
		const optionsAndUser = getOptionsAndUser();
		setSessionStorageInGameStart(optionsAndUser);
	}
}
function getOptionsAndUser() {
	let optionsAndUser = {};
	optionsAndUser["user"] = document.querySelector("#user").value;
	optionsAndUser["cardsQuantity"] = document.querySelector("input[type=radio]:checked").value;
	return optionsAndUser;
}
function setSessionStorageInGameStart(usernameAndCardQuantity) {
	sessionStorage.setItem("userAndCardsQuantity", JSON.stringify(usernameAndCardQuantity));
	window.location.href = "../game/game.html";
}

function validateInputNick() {
	const inputNick = document.querySelector("#user");
	const spanError = document.querySelector("#error-input");
	if (inputNick.value.trim() === "") {
		spanError.classList.remove("hidden");
		inputNick.value = "";
		return true;
	}
}
