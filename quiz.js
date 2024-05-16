const CARD_SELECTOR = '.card';
const AUDIO_SELECTOR = 'audio';
const CARD_CONTAINER_ID = 'cardContainer';
const PREV_ARROW_SELECTOR = '.prev-arrow';
const NEXT_ARROW_SELECTOR = '.next-arrow';
const SHUFFLE_BUTTON_SELECTOR = '.shuffle-button';
const BACK_BUTTON_SELECTOR = '.back-button';

let currentCardIndex = 0;
const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
let cardHistory = [currentCardIndex];
let historyPointer = 0;
const cardDeck = document.querySelectorAll('.card');

function flipCard(isNext) {
    const currentCard = cardDeck[currentCardIndex];
    currentCard.style.display = 'none';

    if (isNext) {
        currentCardIndex = (currentCardIndex + 1) % cardDeck.length;
    } else {
        currentCardIndex = (currentCardIndex - 1 + cardDeck.length) % cardDeck.length;
    }

    const nextCard = cardDeck[currentCardIndex];
    nextCard.style.display = 'block';
}

function shuffleDeck() {
    const shuffledDeck = [...cardDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    const cardContainer = document.querySelector('.card-container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    shuffledDeck.forEach(card => cardContainer.appendChild(card));
}

const audios = Array.from(document.querySelectorAll(AUDIO_SELECTOR));

audios.forEach(audio => audio.addEventListener('ended', resetAudio));

function showCard(index) {
  cards.forEach((card, idx) => {
    card.style.display = idx === index? 'block' : 'none';
  });
  resetAudio();
}

function resetAudio() {
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
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
  const cardContainer = document.getElementById(CARD_CONTAINER_ID);
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

const prevArrow = document.querySelector(PREV_ARROW_SELECTOR);
const nextArrow = document.querySelector(NEXT_ARROW_SELECTOR);
const shuffleButton = document.querySelector(SHUFFLE_BUTTON_SELECTOR);
const backButton = document.querySelector(BACK_BUTTON_SELECTOR);

prevArrow.addEventListener('click', prevCard);
nextArrow.addEventListener('click', nextCard);
shuffleButton.addEventListener('click', shuffleDeck);
backButton.addEventListener('click', shuffleDeck);

window.addEventListener('DOMContentLoaded', () => {
  prevArrow.disabled = true;
  nextArrow.disabled = false;
  if (cards.length > 1) {
    nextArrow.disabled = false;
  }
});

window.addEventListener('load', resetAudio);
