const countdownButton = document.querySelector('.countdown-button');

const minuteLeftSpan = document.querySelector('#minuteLeft');
const minuteRightSpan = document.querySelector('#minuteRight');
const secondLeftSpan = document.querySelector('#secondLeft');
const secondRightSpan = document.querySelector('#secondRight');

let time = 25 * 60;
let minutes = Math.floor(time / 60);
let seconds = time % 60;

let countdown;

function startCountdown() {
  countdown = setInterval(() => {
    time -= 1;
    minutes = Math.floor(time / 60);
    seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes)
      .padStart(2, '0')
      .split('');
    const [secondLeft, secondRight] = String(seconds)
      .padStart(2, '0')
      .split('');

    minuteLeftSpan.innerText = minuteLeft;
    minuteRightSpan.innerText = minuteRight;

    secondLeftSpan.innerText = secondLeft;
    secondRightSpan.innerText = secondRight;

    if (!time) {
      clearInterval(countdown);
      startNewChallenge();
    }
  }, 1000);
}

function resetCountdown() {
  time = 25 * 60;
  minutes = Math.floor(time / 60);
  seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  minuteLeftSpan.innerText = minuteLeft;
  minuteRightSpan.innerText = minuteRight;

  secondLeftSpan.innerText = secondLeft;
  secondRightSpan.innerText = secondRight;
}

function startNewChallenge() {}

countdownButton.addEventListener('click', () => {
  const containsActiveClass = countdownButton.classList.contains('active');

  if (containsActiveClass) {
    countdownButton.classList.remove('active');
    countdownButton.innerText = 'Iniciar Ciclo';
    clearInterval(countdown);
    resetCountdown();
  } else {
    countdownButton.classList.add('active');
    countdownButton.innerText = 'Abandonar Ciclo';
    startCountdown();
  }
});
