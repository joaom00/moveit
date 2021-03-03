const percentToNextLevelText = document.querySelector('#percentage-next-level');
const currentExperienceText = document.querySelector('.current-experience');
const experienceToNextLevelText = document.querySelector(
  '#experience-next-level'
);
const levelText = document.querySelector('.level');

const countdownButton = document.querySelector('.countdown-button');
const challengeBox = document.querySelector('.right-content');

const minuteLeftSpan = document.querySelector('#minuteLeft');
const minuteRightSpan = document.querySelector('#minuteRight');
const secondLeftSpan = document.querySelector('#secondLeft');
const secondRightSpan = document.querySelector('#secondRight');

let time = 0.1 * 60;
let minutes = Math.floor(time / 60);
let seconds = time % 60;
let countdown;
let level = 1;
let currentExperience = 0;
let challengesCompleted = 0;

let experienceToNextLevel = Math.pow((level + 1) * 4, 2);
let percentToNextLevel =
  Math.round(currentExperience * 100) / experienceToNextLevel;

experienceToNextLevelText.innerText = experienceToNextLevel;
levelText.innerText = `Level ${level}`;

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

  const buttons = challengeBox.querySelectorAll('button');

  const succeededButton = challengeBox.querySelector('.succeeded');

  buttons.forEach((button) => {
    button.addEventListener('click', resetAll);
  });

  succeededButton.addEventListener('click', () => {
    completeChallenge(challenge.amount);
  });
}

function completeChallenge(amount) {
  let finalExperience = currentExperience + amount;

  if (finalExperience >= experienceToNextLevel) {
    finalExperience = finalExperience - experienceToNextLevel;
    level += 1;
    experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    levelText.innerText = `Level ${level}`;
    experienceToNextLevelText.innerText = `${experienceToNextLevel} xp`;
  }

  currentExperience = finalExperience;
  percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;
  challengesCompleted += 1;

  currentExperienceText.innerText = currentExperience;
  currentExperienceText.style.left = `${percentToNextLevel}%`;
  percentToNextLevelText.style.width = `${percentToNextLevel}%`;
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
