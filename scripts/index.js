document.querySelector("#btn-start-game").addEventListener("click", setSessionStorageInGameStart);

function getOptionsAndUser() {
	let optionsAndUser = {};
	optionsAndUser["user"] = document.querySelector("#user").value;
	optionsAndUser["cardsQuantity"] = document.querySelector("input[type=radio]:checked").value;
	return optionsAndUser;
}
function setSessionStorageInGameStart(e) {
	e.preventDefault();
	const usernameAndCardQuantity = getOptionsAndUser();
	sessionStorage.setItem("userAndCardsQuantity", JSON.stringify(usernameAndCardQuantity));
	window.location.href = "../game/game.html";
}
