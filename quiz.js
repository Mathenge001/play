let currentCardIndex = 0;
const cards = Array.from(document.querySelectorAll('.card'));
let cardHistory = [currentCardIndex]; // Array to keep track of card history
let historyPointer = 0; // Pointer to navigate through the card history

function showCard(index) {
  cards.forEach((card, idx) => {
    card.style.display = (idx === index) ? 'block' : 'none';
  });
}

function toggleCard() {
  if (this.classList.contains('flip')) {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    cardHistory = cardHistory.slice(0, historyPointer + 1); // Trim history if we go forward after going back
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
    unflipCard()
  }
}

function nextCard() {
  if (historyPointer < cardHistory.length - 1) {
    historyPointer++;
    currentCardIndex = cardHistory[historyPointer];
    showCard(currentCardIndex);
    unflipCard()
  } else {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    cardHistory.push(currentCardIndex);
    historyPointer++;
    showCard(currentCardIndex);
    // unflipCard()
  }
}

function unflipCard() {
  cards.forEach(card => card.classList.remove('flip'));
}
function flipCard(card) {
  card.querySelector('.card-inner').classList.toggle('flipped');
}

function shuffleDeck() {
  const cardContainer = document.getElementById('cardContainer');
  // Remove all cards from the container
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Shuffle the cards array
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Append the shuffled cards back to the container
  cards.forEach(card => cardContainer.appendChild(card));

  // Reset the current card index and history
  currentCardIndex = 0;
  cardHistory = [currentCardIndex];
  historyPointer = 0;
  showCard(currentCardIndex);
}

showCard(currentCardIndex); // Show the initial card

cards.forEach(card => {
  card.addEventListener('click', toggleCard);
});

document.querySelector('.prev-arrow').addEventListener('click', prevCard);
document.querySelector('.next-arrow').addEventListener('click', nextCard);
document.querySelector('.button-container button').addEventListener('click', shuffleDeck);
