// copyright text
const currentTime = new Date();
const footer = document.querySelector('footer');
footer.textContent = footer.textContent.replace('{year}', currentTime.getFullYear().toString());

let backgroundToggled = true;
let previousShuffle = 0;
let animEnabled = true;

const cloudyHeader = document.getElementById('cloudy-header');
const clouds = document.getElementById('clouds');
const sky = document.getElementById('sky');
const overground = document.getElementById('overground');
const transition = document.getElementById('transition');
const underground = document.getElementById('underground');
const animationsButton = document.getElementById('toggle-animations');

const setBackground = (backgroundIndex = 0) => {
  let randomNumber = 0;
  const backgroundStylePreamble = 'url("../mna/img/background/';

  const worldThemes = [
    'Forest',
    'Beach',
    'Desert',
    // 'Underground',
    // 'Sakura',
    // 'Autumn',
    // 'Snow',
    // 'Mountains',
    // 'Sky',
    // 'Volcano'
  ];

  if (1 <= backgroundIndex && backgroundIndex <= worldThemes.length) {
    randomNumber = backgroundIndex;
  } else {
    while (randomNumber === previousShuffle || randomNumber === 0) {
      randomNumber = Math.ceil(Math.random() * worldThemes.length);
    }
  }

  let ext = 'jpg';

  let headerNumber, cloudNumber, undergroundNumber, transitionNumber;
  headerNumber = cloudNumber = undergroundNumber = transitionNumber = randomNumber;

  if ([2, 4, 5, 6, 8, 9].includes(randomNumber)) {
    undergroundNumber = 1;
  }

  if (randomNumber > 1 && randomNumber <= 9 && randomNumber !== 4) {
    headerNumber = 1;
    cloudNumber = 1;
  } else if (randomNumber === 4 || randomNumber === 10) {
    headerNumber = 4;
  }

  if (randomNumber === 4) {
    underground.style.backgroundPositionY = '0';
    cloudyHeader.style.animation = 'none';
    clouds.style.animation = 'none';
    animationsButton.style.opacity = '0';
    animationsButton.style.pointerEvents = 'none';
    ext = 'png';
  } else {
    underground.style.backgroundPositionY = '';
    cloudyHeader.style.animation = '';
    clouds.style.animation = '';
    animationsButton.style.opacity = '';
    animationsButton.style.pointerEvents = '';
  }

  if (randomNumber === 9) {
    transitionNumber = 4;
    overground.style.animation = 'cloud-scroll 50s linear infinite';
    underground.style.backgroundImage = `${backgroundStylePreamble}${randomNumber}/sky.svg")`;
    underground.style.backgroundSize = '100% 100%';
    underground.style.backgroundPositionY = '0';
    sky.style.backgroundImage = '';
  } else {
    overground.style.animation = '';
    underground.style.backgroundPositionY = '';
    underground.style.backgroundSize = '';
  }

  cloudyHeader.style.backgroundImage = `${backgroundStylePreamble}${headerNumber}/cloudy-header.png")`;
  clouds.style.backgroundImage = `${backgroundStylePreamble}${cloudNumber}/clouds.png")`;
  sky.style.backgroundImage = `${backgroundStylePreamble}${randomNumber}/sky.svg")`;
  overground.style.backgroundImage = `${backgroundStylePreamble}${randomNumber}/overground.${ext}")`;
  transition.style.backgroundImage = `${backgroundStylePreamble}${transitionNumber}/transition.png")`;
  underground.style.backgroundImage = `${backgroundStylePreamble}${undergroundNumber}/underground.jpg")`;

  previousShuffle = randomNumber;
  return `Setting theme to ${worldThemes[randomNumber - 1]}.`;
};

const viewBackground = () => {
  let animType = backgroundToggled ? 'hideUI' : 'showUI';
  document.getElementById('title').style.animation = animType + ' 0.5s linear forwards';
  document.getElementById('main-page').style.animation = animType + ' 0.5s linear forwards';
  document.getElementById('title').classList.toggle('hidden');
  document.getElementById('main-page').classList.toggle('hidden');
  backgroundToggled = !backgroundToggled;
};

const toggleAnimations = () => {
  let pause = animEnabled ? 'paused' : 'running';
  let buttonText = animEnabled ? 'Enable' : 'Disable';
  cloudyHeader.style.animationPlayState = pause;
  clouds.style.animationPlayState = pause;
  animEnabled = !animEnabled;
  animationsButton.innerHTML = buttonText + ' Animations';
};

setBackground();
