export { getUserAndOptionsFromSessionStorage };
export { formatToLocalDate };

function getUserAndOptionsFromSessionStorage() {
	const optionsAndUser = JSON.parse(window.sessionStorage.getItem("userAndCardsQuantity"));
	return optionsAndUser;
}
function formatToLocalDate(dateGame) {
	const [year, month, day] = dateGame.split("-");
	return `${day}-${month}-${year}`;
}
