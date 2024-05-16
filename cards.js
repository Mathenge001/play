let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');

if (cards.length === 0) {
  console.error('No cards found');
  return;
}

const showCard = (index) => {
  cards.forEach((card, idx) => {
    card.style.transition = 'transform 0.6s';
    if (idx === index) {
      card.style.transform = 'rotateY(0deg)';
      card.style.display = 'block';
    } else {
      card.style.transform = 'rotateY(180deg)';
      card.style.display = 'none';
    }
  });
}

const toggleCard = () => {
  if (this.classList.contains('flip')) {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
  }
  this.classList.toggle('flip');
  showCard(currentCardIndex);
}

showCard(currentCardIndex); // Show the initial card

cards.forEach(card => {
  card.addEventListener('click', toggleCard);
});



.card {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: transform 0.6s;
}

.card.flip {
  transform: rotateY(180deg);
}

