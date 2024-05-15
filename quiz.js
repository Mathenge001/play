let currentCardIndex = 0;
const cards = Array.from(document.querySelectorAll('.card'));
let cardHistory = [currentCardIndex];
let historyPointer = 0;

const audios = document.getElementsByTagName('audio');
for (let i = 0; i < audios.length; i++) {
  audios[i].addEventListener('ended', resetAudio);
}
function showCard(index) {
  cards.forEach((card, idx) => {
    card.style.display = (idx === index) ? 'block' : 'none';
  });
   resetAudio();
}
function resetAudio() {
  const audios = document.getElementsByTagName('audio');
  for (let i = 0; i < audios.length; i++) {
    audios[i].pause();
    audios[i].currentTime = 0;
  }
}

function toggleCard() {
  if (this.classList.contains('flip')) {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    cardHistory = cardHistory.slice(0, historyPointer + 1);
    cardHistory.push(currentCardIndex);
    historyPointer++;
    showCard(currentCardIndex);
  } else {
    this.classList.toggle('flip');
  }
}

function prevCard() {
  if (historyPointer > 0) {
    historyPointer--;
    currentCardIndex = cardHistory[historyPointer];
    showCard(currentCardIndex);
    unflipCard();
  }
}

function nextCard() {
  if (historyPointer < cardHistory.length - 1) {
    historyPointer++;
    currentCardIndex = cardHistory[historyPointer];
    showCard(currentCardIndex);
    unflipCard();
  } else {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    cardHistory.push(currentCardIndex);
    historyPointer++;
    showCard(currentCardIndex);
  }
}

function flipCard(card) {
  card.querySelector('.card-inner').classList.toggle('flipped');
}
function unflipCard() {
  cards.forEach(card => card.classList.remove('flip'));
}
function shuffleDeck() {
  const cardContainer = document.getElementById('cardContainer');
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  cards.forEach(card => cardContainer.appendChild(card));
  currentCardIndex = 0;
  cardHistory = [currentCardIndex];
  historyPointer = 0;
  showCard(currentCardIndex);
}
showCard(currentCardIndex);

cards.forEach(card => {
  card.addEventListener('click', toggleCard);
});

document.querySelector('.prev-arrow').addEventListener('click', prevCard);
document.querySelector('.next-arrow').addEventListener('click', nextCard);
document.querySelector('.back-button').addEventListener('click', shuffleDeck);

window.addEventListener('load', resetAudio);
