const CARD_SELECTOR = '.card';
const AUDIO_SELECTOR = 'audio';
const CARD_CONTAINER_ID = 'cardContainer';
const PREV_ARROW_SELECTOR = '.prev-arrow';
const NEXT_ARROW_SELECTOR = '.next-arrow';
const SHUFFLE_BUTTON_SELECTOR = '.shuffle-button';
const BACK_BUTTON_SELECTOR = '.back-button';

let currentCardIndex = 0;
const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
const cardDeck = document.querySelectorAll('.card-deck .card');
const cardContainer = document.querySelector('.card-container');
const audios = Array.from(document.querySelectorAll(AUDIO_SELECTOR));
const cardHistory = [currentCardIndex];
let historyPointer = 0;

// Flip the current card to the next or previous one
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

// Shuffle the card deck
function shuffleDeck() {
  const shuffledDeck = [...cardDeck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  shuffledDeck.forEach(card => cardContainer.appendChild(card));
  currentCardIndex = 0;
  cardHistory = [currentCardIndex];
  historyPointer = 0;
  showCard(currentCardIndex);
}

// Reset the audio to the beginning
function resetAudio() {
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

// Show the card at the given index
function showCard(index) {
  cards.forEach((card, idx) => {
    card.style.display = idx === index? 'block' : 'none';
  });
  resetAudio();
}

// Toggle the flip animation for the current card
function toggleCard() {
  const currentCard = cardDeck[currentCardIndex];
  if (currentCard.classList.contains('flip')) {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    cardHistory = cardHistory.slice(0, historyPointer + 1);
    cardHistory.push(currentCardIndex);
    historyPointer++;
    showCard(currentCardIndex);
  } else {
    currentCard.classList.toggle('flip');
  }
}

// Move to the previous card
function prevCard() {
  if (historyPointer > 0) {
    historyPointer--;
    currentCardIndex = cardHistory[historyPointer];
    showCard(currentCardIndex);
    unflipCard();
  }
}

// Move to the next card
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

// Unflip all cards
function unflipCard() {
  cardDeck.forEach(card => card.classList.remove('flip'));
}

// Initialize the card deck
function initializeDeck() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  cards.forEach(card => cardContainer.appendChild(card));
  currentCardIndex = 0;
  cardHistory = [currentCardIndex];
  historyPointer = 0;
  showCard(currentCardIndex);
}

// Add event listeners to the cards
function addCardListeners() {
  cards.forEach(card => {
    card.addEventListener('click', toggleCard);
  });
}

// Add event listeners to the navigation buttons
function addButtonListeners() {
  const prevArrow = document.querySelector(PREV_ARROW_SELECTOR);
  const nextArrow = document.querySelector(NEXT_ARROW_SELECTOR);
  const shuffleButton = document.querySelector(SHUFFLE_BUTTON_SELECTOR);
  const backButton = document.querySelector(BACK_BUTTON_SELECTOR);

  prevArrow.addEventListener('click', prevCard);
  nextArrow.addEventListener('click', nextCard);
  shuffleButton.addEventListener('click', shuffleDeck);
  backButton.addEventListener('click', shuffleDeck);
}

// Initialize the card deck and add event listeners
initializeDeck();
addCardListeners();
addButtonListeners();

// Intersection Observer for lazy loading
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

// Disable/enable navigation buttons based on the number of cards
window.addEventListener('DOMContentLoaded', () => {
  const prevArrow = document.querySelector(PREV_ARROW_SELECTOR);
  const nextArrow = document.querySelector(NEXT_ARROW_SELECTOR);
  if (cards.length > 1) {
    nextArrow.disabled = false;
  } else {
    prevArrow.disabled = true;
    nextArrow.disabled = true;
  }
});

// Reset audio when the window loads
window.addEventListener('load', resetAudio);
