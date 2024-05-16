const CARD_SELECTOR = '.card';
const AUDIO_SELECTOR = 'audio';
const CARD_CONTAINER_ID = 'cardContainer';
const NAV_PREV_SELECTOR = '.nav-prev';
const NAV_NEXT_SELECTOR = '.nav-next';
const SHUFFLE_SELECTOR = '.shuffle';
const BACK_SELECTOR = '.back';
const CARD_FLIP_CLASS = 'is-flipped';

const cardContainer = document.getElementById(CARD_CONTAINER_ID);
const navBtns = { prev: document.querySelector(NAV_PREV_SELECTOR), next: document.querySelector(NAV_NEXT_SELECTOR) };
const shuffleBtn = document.querySelector(SHUFFLE_SELECTOR);
const backBtn = document.querySelector(BACK_SELECTOR);
const audios = document.querySelectorAll(AUDIO_SELECTOR);

let currentCardIndex = 0;
const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
const cardDeck = Array.from(cardContainer.children);
const cardHistory = [currentCardIndex];
let historyPointer = 0;

function flipCard(isNext) {
  const currentCard = cardDeck[currentCardIndex];
  currentCard.classList.remove(CARD_FLIP_CLASS);

  if (isNext) {
    currentCardIndex = (currentCardIndex + 1) % cardDeck.length;
  } else {
    currentCardIndex = (currentCardIndex - 1 + cardDeck.length) % cardDeck.length;
  }

  const nextCard = cardDeck[currentCardIndex];
  nextCard.classList.add(CARD_FLIP_CLASS);
}

function shuffleDeck() {
  const shuffledDeck = cardDeck.slice().sort(() => Math.random() - 0.5);
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  shuffledDeck.forEach(card => cardContainer.appendChild(card));
  currentCardIndex = 0;
  cardHistory = [currentCardIndex];
  historyPointer = 0;
  showCard(currentCardIndex);
}

function resetAudio() {
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function showCard(index) {
  cards.forEach((card, idx) => {
    card.style.display = idx === index ? 'block' : 'none';
  });
  resetAudio();
}

function toggleCard() {
  const currentCard = cardDeck[currentCardIndex];
  if (currentCard.classList.contains(CARD_FLIP_CLASS)) {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    cardHistory = cardHistory.slice(0, historyPointer + 1);
    cardHistory.push(currentCardIndex);
    historyPointer++;
    showCard(currentCardIndex);
  } else {
    currentCard.classList.add(CARD_FLIP_CLASS);
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

function unflipCard() {
  cardDeck.forEach(card => card.classList.remove(CARD_FLIP_CLASS));
}

function initializeDeck() {
  cardContainer.innerHTML = '';
  cards.forEach(card => cardContainer.appendChild(card));
  currentCardIndex = 0;
  cardHistory = [currentCardIndex];
  historyPointer = 0;
  showCard(currentCardIndex);
}

function addCardListeners() {
  cards.forEach(card => {
    card.addEventListener('click', toggleCard);
  });
}

function addButtonListeners() {
  Object.values(navBtns).forEach(btn => btn.addEventListener('click', e => e.target.dataset.direction === 'prev' ? prevCard() : nextCard()));
  shuffleBtn.addEventListener('click', shuffleDeck);
  backBtn.addEventListener('click', shuffleDeck);
}

function disableNavButtons(disable) {
  Object.values(navBtns).forEach(btn => btn.disabled = disable);
}

initializeDeck();
addCardListeners();
addButtonListeners();
disableNavButtons(cards.length < 2);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.display = 'block';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach((card) => {
  observer.observe(card);
});

window.addEventListener('DOMContentLoaded', () => {
  disableNavButtons(cards.length < 2);
});

window.addEventListener('load', resetAudio);

