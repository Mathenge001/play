let currentCardIndex = 0;
const cardsContainer = document.querySelector('.cards-container');

if (!cardsContainer) {
  console.error('No cards container found');
  return;
}

const cards = Array.from(cardsContainer.querySelectorAll('.card'));

if (cards.length === 0) {
  console.error('No cards found');
  return;
}

const showCard = (index) => {
  cards.forEach((card, idx) => {
    card.classList.toggle('flip', idx === index);
  });
}

const handleCardClick = (event) => {
  const clickedCard = event.target.closest('.card');

  if (!clickedCard || clickedCard.classList.contains('flip')) {
    return;
  }

  currentCardIndex = (currentCardIndex + 1) % cards.length;
  showCard(currentCardIndex);
}

showCard(currentCardIndex); // Show the initial card

cardsContainer.addEventListener('click', handleCardClick);

.card {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: transform 0.6s;
  cursor: pointer;
}

.card.flip {
  transform: rotateY(180deg);
}

<div class="cards-container">
  <!-- Add .card elements here -->
</div>
