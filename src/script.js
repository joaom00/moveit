const localStorageImg = localStorage.getItem('@MoveIt:img');
const localStorageName = localStorage.getItem('@MoveIt:name');
const localStorageLevel = Number(localStorage.getItem('@MoveIt:level'));
const localStorageCurrentExperience = Number(
  localStorage.getItem('@MoveIt:currentExperience')
);
const localStorageChallengesCompleted = Number(
  localStorage.getItem('@MoveIt:challengesCompleted')
);

const percentToNextLevelText = document.querySelector('#percentage-next-level');
const currentExperienceText = document.querySelector('.current-experience');
const levelText = document.querySelector('.level');
const experienceToNextLevelText = document.querySelector(
  '#experience-next-level'
);
const challengesCompletedText = document.querySelector(
  '.challenges-completed span'
);

const userName = document.querySelector('.profile h1');
const profileImg = document.querySelector('.profile img');
const countdownButton = document.querySelector('.countdown-button');
const challengeBox = document.querySelector('.challenge-box');
const modalContainer = document.querySelector('.modal-container');
const closeModalButton = document.querySelector('.close-modal');

const minuteLeftSpan = document.querySelector('#minute-left');
const minuteRightSpan = document.querySelector('#minute-right');
const secondLeftSpan = document.querySelector('#second-left');
const secondRightSpan = document.querySelector('#second-right');

let time = 0.1 * 60;
let minutes = Math.floor(time / 60);
let seconds = time % 60;
let countdown;
let level;
let currentExperience;
let challengesCompleted;

userName.innerText = localStorageName || 'Sem nome';
profileImg.src = localStorageImg || '';
level = localStorageLevel || 1;
currentExperience = localStorageCurrentExperience || 0;
challengesCompleted = localStorageChallengesCompleted || 0;

currentExperienceText.innerText = `${currentExperience} xp`;

let experienceToNextLevel = Math.pow((level + 1) * 4, 2);
let percentToNextLevel =
  Math.round(currentExperience * 100) / experienceToNextLevel;

experienceToNextLevelText.innerText = `${experienceToNextLevel} xp`;
levelText.innerText = `Level ${level}`;
challengesCompletedText.innerText = challengesCompleted;
currentExperienceText.style.left = `${percentToNextLevel}%`;
percentToNextLevelText.style.width = `${percentToNextLevel}%`;

const challengeNotActiveHTML = `
<h3>
Inicie um ciclo <br />
para receber desafios
</h3>
<img src="./icons/level-up.svg" alt="" />
<p>
Avance de level completando <br />
os desafios.
</p>
`;

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
  time = 0.1 * 60;
  minutes = Math.floor(time / 60);
  seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  minuteLeftSpan.innerText = minuteLeft;
  minuteRightSpan.innerText = minuteRight;

  secondLeftSpan.innerText = secondLeft;
  secondRightSpan.innerText = secondRight;
}

function resetAll() {
  resetCountdown();

  challengeBox.classList.remove('challenge-active');
  challengeBox.innerHTML = challengeNotActiveHTML;

  countdownButton.classList.remove('closed');
  countdownButton.innerText = 'Iniciar Ciclo';
  countdownButton.removeAttribute('disabled');
}

function ExerciseType(exerciseType) {
  if (exerciseType === 'body') return 'body';
  return 'eye';
}

function startNewChallenge() {
  const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges[randomChallengeIndex];

  challengeBox.classList.add('challenge-active');
  challengeBox.innerHTML = `
  <header>
  <p>Ganhe ${challenge.amount} xp</p>
  </header>
  
  <div class="challenge">
  <div><img src="./icons/${ExerciseType(
    challenge.type
  )}.svg" alt="Desafio de ${ExerciseType(challenge.type)}" /></div>
  <h3>Exercite-se</h3>
  <p>
    ${challenge.description}
  </p>
  </div>
  
  <div class="button-container">
  <button class="failed">Falhei</button>
  <button class="succeeded">Completei</button>
  </div>
  `;

  countdownButton.classList.remove('active');
  countdownButton.classList.add('closed');
  countdownButton.innerText = 'Ciclo encerrado';
  countdownButton.setAttribute('disabled', true);

  const succeededButton = challengeBox.querySelector('.succeeded');
  const failedButton = challengeBox.querySelector('.failed');

  failedButton.addEventListener('click', resetAll);

  succeededButton.addEventListener('click', () => {
    completeChallenge(challenge.amount);
    resetAll();
  });

  new Audio('./notification.mp3').play();

  if (Notification.permission === 'granted') {
    new Notification('Novo desafio 🎉', {
      body: `Valendo ${challenge.amount}xp!`,
    });
  }
}

function completeChallenge(amount) {
  let finalExperience = currentExperience + amount;

  if (finalExperience >= experienceToNextLevel) {
    finalExperience = finalExperience - experienceToNextLevel;
    level += 1;
    experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    showPopup(level);

    levelText.innerText = `Level ${level}`;
    experienceToNextLevelText.innerText = `${experienceToNextLevel} xp`;

    localStorage.setItem('@MoveIt:level', level);
  }

  currentExperience = finalExperience;
  challengesCompleted += 1;
  percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  localStorage.setItem('@MoveIt:currentExperience', currentExperience);
  localStorage.setItem('@MoveIt:challengesCompleted', challengesCompleted);

  currentExperienceText.innerText = `${currentExperience} xp`;
  currentExperienceText.style.left = `${percentToNextLevel}%`;
  percentToNextLevelText.style.width = `${percentToNextLevel}%`;
  challengesCompletedText.innerText = challengesCompleted;
}

function showPopup(level) {
  const modal = modalContainer.querySelector('.modal');
  const levelText = modalContainer.querySelector('.wings span');

  modalContainer.classList.add('active');
  modal.classList.add('active');
  levelText.innerText = level;
}

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

closeModalButton.addEventListener('click', () => {
  const modal = modalContainer.querySelector('.modal');

  modalContainer.classList.remove('active');
  modal.classList.remove('active');
});

const dropdownButton = document.querySelector('.dropdown-button');
const resetDataButton = document.querySelector('.reset-button');

dropdownButton.addEventListener('click', () => {
  dropdownButton.querySelector('.dropdown').classList.toggle('active');
});

resetDataButton.addEventListener('click', () => {
  localStorage.removeItem('@MoveIt:level');
  localStorage.removeItem('@MoveIt:challengesCompleted');
  localStorage.removeItem('@MoveIt:currentExperience');
  window.location.reload();
});

window.addEventListener('load', () => Notification.requestPermission());
