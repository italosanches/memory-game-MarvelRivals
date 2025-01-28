export { getUserAndOptionsFromSessionStorage };
export { formatToLocalDate };
export { calculateTimeFromGame };
export { formatTimeToFront };
function getUserAndOptionsFromSessionStorage() {
	const optionsAndUser = JSON.parse(window.sessionStorage.getItem("userAndCardsQuantity"));
	return optionsAndUser;
}
function formatToLocalDate(dateGame) {
	const [year, month, day] = dateGame.split("-");
	return `${day}-${month}-${year}`;
}

function calculateTimeFromGame(startGame, endGame) {
	let elapsedTime = endGame - startGame;
	let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
	let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
	let milliseconds = elapsedTime % 1000;
	const finalTime = formatTime(hours, minutes, seconds);
	console.log(milliseconds);
	return `${finalTime}.${milliseconds}`;
}

function formatTime(hours, minutes, seconds) {
	hours = hours >= 10 ? hours : `0${hours}`;
	minutes = minutes >= 10 ? minutes : `0${minutes}`;
	seconds = seconds >= 10 ? seconds : `0${seconds}`;
	return `${hours}:${minutes}:${seconds}`;
}

function formatTimeToFront(time) {
	const timeSplit = time.split(".");
	const millisecondsFormated = timeSplit[1].substring(0, 3);
	return `${timeSplit[0]}:${millisecondsFormated}`;
}
