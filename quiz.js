let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');

function showCard(index) {
  cards.forEach((card, idx) => {
    if (idx === index) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}






function toggleCard() {
  // Check if the card is already flipped
  if (this.classList.contains('flip')) {
    // If flipped, show the next card
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
  } else {
    // If not flipped, flip the card
    this.classList.toggle('flip');
  }
}

function prevCard() {
  currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
  showCard(currentCardIndex);
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  showCard(currentCardIndex);
}

showCard(currentCardIndex); // Show the initial card

cards.forEach(card => {
  card.addEventListener('click', toggleCard);
});

document.querySelector('.prev-arrow').addEventListener('click', prevCard);

let flippedCards = [];



document.querySelector('.save-progress-button').addEventListener('click', saveProgress);
document.querySelector('.reshuffle-deck-button').addEventListener('click', reshuffleDeck);
