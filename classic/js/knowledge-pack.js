(() => {
  const deck = document.getElementById('cardContainer');
  if (!deck) return;

  const questions = [
    // HISTORICAL EVENTS
    {c:'History',d:'Easy',q:'In what year did Kenya gain independence from Britain?',a:'1963'},
    {c:'History',d:'Easy',q:'Which wall fell in 1989, becoming a major symbol of the end of the Cold War in Europe?',a:'The Berlin Wall'},
    {c:'History',d:'Easy',q:'In what year did the French Revolution begin?',a:'1789'},
    {c:'History',d:'Easy',q:'Which ancient civilization built Machu Picchu?',a:'The Inca civilization'},
    {c:'History',d:'Easy',q:'Who was elected President of South Africa in 1994 after the end of apartheid rule?',a:'Nelson Mandela'},
    {c:'History',d:'Easy',q:'Which city hosted the first modern Olympic Games in 1896?',a:'Athens, Greece'},
    {c:'History',d:'Easy',q:'Which two brothers made the first successful powered airplane flight in 1903?',a:'Orville and Wilbur Wright'},
    {c:'History',d:'Easy',q:'In what year did World War II end?',a:'1945'},
    {c:'History',d:'Easy',q:'Which empire was ruled by Mansa Musa in the 14th century?',a:'The Mali Empire'},
    {c:'History',d:'Easy',q:'What name is given to the picture-based writing system used in ancient Egypt?',a:'Hieroglyphs'},

    {c:'History',d:'Medium',q:'The signing of Magna Carta in England took place in what year?',a:'1215'},
    {c:'History',d:'Medium',q:'Which empire captured Constantinople in 1453?',a:'The Ottoman Empire'},
    {c:'History',d:'Medium',q:'What 1919 treaty formally ended the state of war between Germany and the Allied Powers after World War I?',a:'The Treaty of Versailles'},
    {c:'History',d:'Medium',q:'The Industrial Revolution first developed on a large scale in which country?',a:'Great Britain'},
    {c:'History',d:'Medium',q:'What was the capital city of the Byzantine Empire?',a:'Constantinople'},
    {c:'History',d:'Medium',q:'Which volcano buried Pompeii in 79 CE?',a:'Mount Vesuvius'},
    {c:'History',d:'Medium',q:'The Meiji Restoration, which transformed Japan politically and economically, began in what year?',a:'1868'},
    {c:'History',d:'Medium',q:'Which African empire had Gao as its major capital and flourished in the 15th and 16th centuries?',a:'The Songhai Empire'},
    {c:'History',d:'Medium',q:'The Mau Mau uprising took place primarily in which present-day country?',a:'Kenya'},
    {c:'History',d:'Medium',q:'Which battle in 1066 led to Norman rule in England?',a:'The Battle of Hastings'},

    {c:'History',d:'Hard',q:'The Berlin Conference of 1884–1885 was mainly concerned with European colonial claims on which continent?',a:'Africa'},
    {c:'History',d:'Hard',q:'Which city was the ceremonial and political center of the Aztec Empire when the Spanish arrived?',a:'Tenochtitlan'},
    {c:'History',d:'Hard',q:'Which empire was ruled by Emperor Justinian I in the 6th century?',a:'The Byzantine (Eastern Roman) Empire'},
    {c:'History',d:'Hard',q:'Which 1807 British law ended British participation in the transatlantic slave trade?',a:'The Slave Trade Act 1807'},
    {c:'History',d:'Hard',q:'Which event in 1917 brought the Bolsheviks to power in Russia?',a:'The October Revolution'},
    {c:'History',d:'Hard',q:'Which ancient city in present-day Zimbabwe gave its name to the modern country?',a:'Great Zimbabwe'},
    {c:'History',d:'Hard',q:'What was the name of the trade network linking East Asia, Central Asia, the Middle East and Europe for centuries?',a:'The Silk Road'},
    {c:'History',d:'Hard',q:'Which canal opened in 1869 and created a direct sea route between the Mediterranean and Red Sea?',a:'The Suez Canal'},
    {c:'History',d:'Hard',q:'The Western Roman Empire is conventionally said to have fallen in what year?',a:'476 CE'},
    {c:'History',d:'Hard',q:'Which city became the center of the Italian Renaissance and was strongly associated with the Medici family?',a:'Florence'},

    // NATURAL GEOGRAPHY
    {c:'Natural Geography',d:'Easy',q:'What is the largest ocean on Earth?',a:'The Pacific Ocean'},
    {c:'Natural Geography',d:'Easy',q:'What is the largest hot desert in the world?',a:'The Sahara Desert'},
    {c:'Natural Geography',d:'Easy',q:'Mount Kilimanjaro is located in which country?',a:'Tanzania'},
    {c:'Natural Geography',d:'Easy',q:'What is the highest mountain above sea level?',a:'Mount Everest'},
    {c:'Natural Geography',d:'Easy',q:'Which lake is the largest in Africa by surface area?',a:'Lake Victoria'},
    {c:'Natural Geography',d:'Easy',q:'Which mountain range contains Mount Everest?',a:'The Himalayas'},
    {c:'Natural Geography',d:'Easy',q:'What imaginary line circles Earth at 0° latitude?',a:'The Equator'},
    {c:'Natural Geography',d:'Easy',q:'Victoria Falls lies on which major African river?',a:'The Zambezi River'},
    {c:'Natural Geography',d:'Easy',q:'What is a group or chain of islands called?',a:'An archipelago'},
    {c:'Natural Geography',d:'Easy',q:'The Great Barrier Reef lies off the coast of which country?',a:'Australia'},

    {c:'Natural Geography',d:'Medium',q:'What is the deepest freshwater lake in the world?',a:'Lake Baikal'},
    {c:'Natural Geography',d:'Medium',q:'Which mountain chain runs along much of the western edge of South America?',a:'The Andes'},
    {c:'Natural Geography',d:'Medium',q:'The Atacama Desert is mainly located in which country?',a:'Chile'},
    {c:'Natural Geography',d:'Medium',q:'What is a crescent-shaped lake formed when a river meander is cut off?',a:'An oxbow lake'},
    {c:'Natural Geography',d:'Medium',q:'What is a deep, narrow sea inlet formed when a glacial valley is flooded?',a:'A fjord'},
    {c:'Natural Geography',d:'Medium',q:'What is the broad, shallow submerged edge of a continent called?',a:'The continental shelf'},
    {c:'Natural Geography',d:'Medium',q:'What biome is dominated by grasses with scattered trees and has distinct wet and dry seasons?',a:'Savanna'},
    {c:'Natural Geography',d:'Medium',q:'What is the vast northern forest biome dominated by coniferous trees called?',a:'Taiga (boreal forest)'},
    {c:'Natural Geography',d:'Medium',q:'What is the boundary separating two neighboring drainage basins called?',a:'A watershed or drainage divide'},
    {c:'Natural Geography',d:'Medium',q:'The Pacific “Ring of Fire” is especially known for frequent earthquakes and what other feature?',a:'Volcanoes'},

    {c:'Natural Geography',d:'Hard',q:'What landscape type forms when soluble rock such as limestone is dissolved, often creating caves and sinkholes?',a:'Karst topography'},
    {c:'Natural Geography',d:'Hard',q:'What climate effect makes the leeward side of a mountain range much drier than the windward side?',a:'The rain-shadow effect'},
    {c:'Natural Geography',d:'Hard',q:'What periodic climate pattern involves unusually warm surface waters in the central and eastern tropical Pacific?',a:'El Niño'},
    {c:'Natural Geography',d:'Hard',q:'What is the permanently frozen ground common beneath tundra regions called?',a:'Permafrost'},
    {c:'Natural Geography',d:'Hard',q:'What type of river mouth forms where freshwater mixes with seawater in a partly enclosed coastal body?',a:'An estuary'},
    {c:'Natural Geography',d:'Hard',q:'What landform is created when sediment builds up where a river enters a sea or lake?',a:'A delta'},
    {c:'Natural Geography',d:'Hard',q:'The Himalayas formed mainly because the Indian Plate collided with which tectonic plate?',a:'The Eurasian Plate'},
    {c:'Natural Geography',d:'Hard',q:'What is the process called when coral loses its symbiotic algae, often because of heat stress?',a:'Coral bleaching'},
    {c:'Natural Geography',d:'Hard',q:'What is a looping bend in a river channel called?',a:'A meander'},
    {c:'Natural Geography',d:'Hard',q:'What geothermal feature periodically erupts hot water and steam from the ground?',a:'A geyser'},

    // SCIENCE
    {c:'Science',d:'Easy',q:'What is the chemical symbol for gold?',a:'Au'},
    {c:'Science',d:'Easy',q:'Which planet is known as the Red Planet?',a:'Mars'},
    {c:'Science',d:'Easy',q:'What is the largest planet in our Solar System?',a:'Jupiter'},
    {c:'Science',d:'Easy',q:'At standard atmospheric pressure, water freezes at what temperature on the Celsius scale?',a:'0°C'},
    {c:'Science',d:'Easy',q:'What gas do humans need for normal cellular respiration?',a:'Oxygen'},
    {c:'Science',d:'Easy',q:'What organ pumps blood around the human body?',a:'The heart'},
    {c:'Science',d:'Easy',q:'Which part of a plant cell carries out most photosynthesis?',a:'The chloroplast'},
    {c:'Science',d:'Easy',q:'What force keeps planets in orbit around the Sun?',a:'Gravity'},
    {c:'Science',d:'Easy',q:'What is the nearest star to Earth?',a:'The Sun'},
    {c:'Science',d:'Easy',q:'What is the basic unit of life?',a:'The cell'},

    {c:'Science',d:'Medium',q:'What particle in an atom has a negative electric charge?',a:'The electron'},
    {c:'Science',d:'Medium',q:'What does the atomic number of an element represent?',a:'The number of protons in its nucleus'},
    {c:'Science',d:'Medium',q:'What is the SI unit of force?',a:'The newton (N)'},
    {c:'Science',d:'Medium',q:'What is the SI unit of energy?',a:'The joule (J)'},
    {c:'Science',d:'Medium',q:'What is the SI unit of electrical current?',a:'The ampere (A)'},
    {c:'Science',d:'Medium',q:'What process changes a gas into a liquid?',a:'Condensation'},
    {c:'Science',d:'Medium',q:'What process changes a solid directly into a gas without becoming liquid first?',a:'Sublimation'},
    {c:'Science',d:'Medium',q:'What molecule carries most hereditary information in living organisms?',a:'DNA'},
    {c:'Science',d:'Medium',q:'What protein in red blood cells binds and transports oxygen?',a:'Hemoglobin'},
    {c:'Science',d:'Medium',q:'Can ordinary sound waves travel through a perfect vacuum?',a:'No — sound needs a material medium'},

    {c:'Science',d:'Hard',q:'What is the boundary around a black hole beyond which light cannot escape called?',a:'The event horizon'},
    {c:'Science',d:'Hard',q:'Stars like the Sun release energy primarily by fusing hydrogen into what element?',a:'Helium'},
    {c:'Science',d:'Hard',q:'What is an isotope?',a:'Atoms of the same element with the same number of protons but different numbers of neutrons'},
    {c:'Science',d:'Hard',q:'In physics, density is calculated as mass divided by what?',a:'Volume'},
    {c:'Science',d:'Hard',q:'What type of biological molecule speeds up chemical reactions without being consumed?',a:'An enzyme'},
    {c:'Science',d:'Hard',q:'Why do antibiotics generally not cure viral infections?',a:'They target bacterial structures or processes, not viruses'},
    {c:'Science',d:'Hard',q:'What is the approximate speed of light in a vacuum?',a:'About 300,000 km/s (3 × 10^8 m/s)'},
    {c:'Science',d:'Hard',q:'What is the main energy-carrying molecule used directly by cells?',a:'ATP (adenosine triphosphate)'},
    {c:'Science',d:'Hard',q:'What organelle is often called the “powerhouse of the cell” because it produces most cellular ATP?',a:'The mitochondrion (mitochondria)'},
    {c:'Science',d:'Hard',q:'A neutral solution at about room temperature has approximately what pH?',a:'pH 7'}
  ];

  const icon = {'History':'⌛','Natural Geography':'🌍','Science':'⚛'};
  const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const escapeHtml = value => String(value).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

  const fragment = document.createDocumentFragment();
  questions.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card knowledge-card';
    card.dataset.category = item.c;
    card.dataset.difficulty = item.d;
    card.dataset.knowledge = 'true';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front knowledge-face category-${slug(item.c)}">
          <div class="knowledge-orb" aria-hidden="true">${icon[item.c]}</div>
          <div class="knowledge-meta"><span>${escapeHtml(item.c)}</span><span>${escapeHtml(item.d)}</span></div>
          <p>${escapeHtml(item.q)}</p>
        </div>
        <div class="card-back knowledge-face category-${slug(item.c)}">
          <div class="knowledge-orb answer-orb" aria-hidden="true">✓</div>
          <div class="knowledge-meta"><span>${escapeHtml(item.c)}</span><span>Answer</span></div>
          <p>${escapeHtml(item.a)}</p>
        </div>
      </div>`;
    fragment.appendChild(card);
  });
  deck.appendChild(fragment);

  window.PartyPlayKnowledgePack = {
    count: questions.length,
    categories: ['History','Natural Geography','Science'],
    counts: questions.reduce((acc, q) => ((acc[q.c] = (acc[q.c] || 0) + 1), acc), {})
  };
})();
