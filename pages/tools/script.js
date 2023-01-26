
const bugSound = new Audio('./sound/bug_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alertwav');


const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up_message');
const popUpRefresh = document.querySelector('.pop-up_refresh');


const searchButton = document.querySelector('.searchButton');


function stopGame() {

    showPopUpWithText('Please, click here to try it again!');
    playSound(bugSound);
}



function showPopUpWithText(text) {

    popUpText.innerText = text;
    popUp.classList.remove('pop-up-hide');
}

function playSound(sound) {
    sound.play();
}


function hidePopUp() {
    popUp.classList.add('pop-up-hide');
}

popUpRefresh.addEventListener('click', (e) => {
    e.preventDefault();
    hidePopUp();
    playSound(carrotSound);
});


function workPopUp() {
stopGame()

}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    workPopUp();
});

